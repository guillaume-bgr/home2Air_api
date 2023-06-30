const db = require('./../models/index');
const Park = db['Parks'];

exports.getAllParks = (req, res) => {
    Park.findAll({
        order: [['createdAt', 'DESC']],
        include: { all: true, nested: true }
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
            return res.status(404).json({ message: 'This park does not exist !' })
        }
        return res.json({ data: park })
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addPark = async (req, res) => {
    const { name, company_id, building_id } = req.body
    if ( !name ) {
        return res.status(400).json({ message: 'Missing Data' })
    }
    try {
            let parkc = await Park.create(req.body);
            return res.json({ message: 'Park Created', data: parkc })
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
    try{
        let park = await Park.findOne({ where: {id: parkId}})
        if(park === null) {
            return res.status(404).json({ message: 'This park does not exist.' })
        } else {
            park.name = req.body.name ?? park.name;
            park.building_id = req.body.building_id ?? park.building_id;
            park.company_id = req.body.company_id ?? park.company_id;
            await park.save();
            return res.json({ message: 'Park Updated', data: { park } })
        }
        // await Park.update(req.body, { where: {id: parkId} })
        // return res.json({ message: 'Park Updated', data: { park } })
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
    Park.destroy({ where: {id: parkId}, force: true})
        .then(() => res.status(200).json({ message: 'Park deleted' }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getParkSensors = async (req, res) => {
    let parkId = parseInt(req.params.id);
    if (!parkId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    try{
        let park = await Park.findOne({ include: ["Sensors"], where: { id: parkId }})
        if (park === null) {
            return res.status(404).json({ message: 'This park does not exist !' })
        }
        return res.json(park.Sensors)
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}