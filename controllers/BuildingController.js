const db = require('./../models/index');
const Building = db['Buildings'];
const Customer = db['Customers'];

/**********************************/
/*** Routage de la ressource Building */

exports.getBuildings = (req, res) => {
    Building.findAll({
        include: {
            model: Customer,
            where: {
                id: res.tokenId
            },
            through: {
                attributes: ['isOwner'],
            },
        },
    })
    .then(buildings => res.json({ count: buildings.length, buildings }))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getBuilding = async (req, res) => {
    let buildingId = parseInt(req.params.id)
    if (!buildingId) {
        return res.status(400).json({ message: 'Missing Parameter' })
    }
    try { 
        let building = await Building.findOne({
            where: {
                id: buildingId,
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
        return res.json(building)
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
        return res.status(201).json({ message: 'Building successfully created' });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
        message: error.message,
        });
    }
}

exports.updateBuilding = async (req, res) => {
    const userId = res.tokenId
    if (!userId) {
        return res.status(403).json({ message: 'Forbidden' })
    } else if (!req.params.id) {
        return res.status(400).json({ message: 'Missing Parameter' })
    }
    const { name } = req.body
    if ( !name ) {
        req.body.name = 'Nouveau building'
    }
    try {
        const building = await Building.findOne({
            where: {
                id: req.params.id,
            },
            include: {
                model: Customer,
                attributes: ["id", "first_name", "last_name", "email", "roles_id", "companies_id"],
                through: {
                    attributes: ['isOwner'],
                    where: {
                        isOwner: true,
                    },
                },
            },
        });
        if ( !building ) {
            return res.status(404).json({ message: 'Building not found' })
        }
        if ( !building.Customers.length == 0 ) {
            building.name = req.body.name
            await building.save();
            return res.status(200).json({
                building,
            });
        }
        return res.status(403).json({message: 'Building ownership needed for this operation'})
    } catch(error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message,
        });
    }
}

exports.deleteBuilding = async (req, res) => {
    const userId = res.tokenId
    if (!userId) {
        return res.status(403).json({ message: 'Forbidden' })
    } else if (!req.params.id) {
        return res.status(400).json({ message: 'Missing Parameter' })
    }
    try {
        const building = await Building.findOne({
            where: {
                id: req.params.id,
            },
            include: {
                model: Customer,
                attributes: ["id", "first_name", "last_name", "email", "roles_id", "companies_id"],
                through: {
                    attributes: ['isOwner'],
                    where: {
                        customerId: userId,
                        isOwner: true,
                    },
                },
            },
        });
        if ( !building ) {
            return res.status(404).json({ message: 'Building not found' })
        }
        if ( !building.Customers.length == 0 ) {
            let destroy = await building.destroy();
            return res.status(200).json({ message: 'Building deleted', destroy: destroy })
        }
        return res.status(403).json({message: 'Building ownership needed for this operation'})
    } catch(error) {
        return res.status(error.status || 500).json({
            message: error.message,
        });
    }
}

