const db = require('./../models/index');
const Building = db['Buildings'];
const Customer = db['Customers'];

/**********************************/
/*** Routage de la ressource Building */

exports.getBuildings = async (req, res) => {
    try {
        const buildings = await Building.findAll({
        // attributes: ['customer_name'],
        include: {
            model: Customer,
            through: {
            attributes: ['isOwner'],
            },
        },
        });
    
        res.status(200).json({
        buildings,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getCustomerBuildings = async (req, res) => {
    let customerId = parseInt(req.params.id)
    if (!customerId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        const response = await Customer.findOne({
            attributes: ['id', 'first_name', 'last_name', 'email', 'password','img', 'notifications', 'roles_id', 'companies_id', 'subscriptions_id'],
            where: {
                id: req.params.id,
            },
            include: {
                model: Building,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['customerId', 'isOwner'],
                },
            },
        });
        res.status(200).json(response.Buildings)
    } catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.getBuilding = async (req, res) => {
    let buildingId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!buildingId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try { 
        let building = await Building.findOne({
            where: {
                id: req.params.id,
            },
            include: {
                model: Customer,
                attributes: ["id", "first_name", "last_name", "email", "roles_id", "companies_id"],
                through: {
                    attributes: ['isOwner'],
                },
            },
        });
        if (building === null) {
            return res.status(404).json({ message: 'This building does not exist !' })
        }

        return res.json({ data: building })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addBuilding = async (req, res) => {
    if (!res.tokenId) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    const { name } = req.body
    if ( !name ) {
        req.body.name = 'Nouveau building'
    }

    try {
        let customer = await Customer.findByPk(parseInt(res.tokenId))
        let building = await Building.create(req.body)

        await building.addCustomer(customer, {
            through: { isOwner: true }
        })

        res.status(201).json({ message: 'Building successfully created' });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({
        message: error.message,
        });
    }
}

exports.updateBuilding = async (req, res) => {
    const id = res.tokenId
    if (!id) {
        return res.status(403).json({ message: 'Forbidden' })
    } else if (!req.params.id) {
        return res.status(400).json({ message: 'Missing Parameter' })
    }

    const { name } = req.body
    if ( !name ) {
        req.body.name = 'Nouveau building'
    }
    console.log(res);
    const building = this.getBuilding({params: {id: id}})
    if ( !building ) {
        console.log(res);
        return res.status(404).json({ message: 'Building not found' })
    }
}