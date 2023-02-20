const db = require('./../models/index');
const Park = db['Parks'];

exports.getAllParks = (req, res) => {
    Park.findAll({
        order: [['createdAt', 'DESC']]
    })
    .then(park => res.json(park))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getPark = async (req, res) => {
    let parkId = parseInt(req.params.id)
    if (!parkId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }
    try{
        let park = await Park.findOne({ where: { id: parkId }})
        if (park === null) {
            return res.status(404).json({ message: 'This company does not exist !' })
        }
        return res.json({ data: park })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addPark = async (req, res) => {
    const { name, company_id, building_id } = req.body
    if ( !name || !company_id || !building_id ) {
        return res.status(400).json({ message: 'Missing Data' })
    }
    try {
        const park = await Park.findOne({ where: { name: name, building_id: building_id }, raw: true })
        let parkc;
        if (park !== null) {
            let copyInt = 1
            let parks = await Park.findAll({where: {building_id: building_id}})
            for (let park in parks) {
                if (park.name == req.body.name) {
                    copyInt += 1
                }
            }
            parkc = await Park.create({name: name, company_id: company_id, building_id: building_id})
            return res.json({ message: 'Park Created', data: { parkc } })
        } else {
            parkc = await Park.create(req.body);
            return res.json({ message: 'Park Created', data: { parkc } })
        }
    }catch(err){
        console.log(err)
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updatePark = async (req, res) => {
    let parkId = parseInt(req.params.id)
    if (!parkId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    if (!res.tokenRole || !res.tokenId) {
        return res.status(400).json({ message: 'Missing token' })
    }
    try{
        let park = await Park.findOne({ where: {id: parkId}})
        if(park === null) {
            return res.status(404).json({ message: 'This park does not exist.' })
        } else if (await Park.findOne({ where: {name: req.body.name}})) {
            let copyInt = 1
            while (await Park.findOne({ where: { name:  park.name + ` (${copyInt})`, building_id: park.building_id }, raw: true }) !== null) {
                copyInt += 1
            }
            park.name = req.body.name ?? park.name;
            park.building_id = req.body.building_id ?? park.building_id;
            park.company_id = req.body.company_id ?? park.company_id;
            console.log(park);
            await park.save();
            return res.json({ message: 'Park Updated', data: { park } })
        }
        await Park.update(req.body, { where: {id: parkId} })
        return res.json({ message: 'Company Updated' })
    } catch(err){ 
        console.log(err)
        return res.status(500).json({ message: 'Database Error' })
    }
}

exports.deletePark =  (req, res) => {
    let parkId = parseInt(req.params.id);
    if (!parkId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    if (!res.tokenRole || !res.tokenCompany) {
        return res.status(400).json({ message: 'Missing token' })
    }
    if (res.tokenRole == "ADMIN" || parkId === res.parkId) {
        Park.destroy({ where: {id: parkId}, force: true})
            .then(() => res.status(200).json({ message: 'Park deleted' }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}