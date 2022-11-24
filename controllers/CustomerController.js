const db = require('./../models/index');
const Customer = db['Customer'];
const bcrypt = require('bcrypt');

/**********************************/
/*** Routage de la ressource Customer */
exports.getAllCustomers = async (req, res) => {
    const query = await Customer.findAll({ 
        include: ['Orders']
    })
    console.log(query);
        // .then(customers => res.json({ data: customers }))
        // .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getCustomer = async (req, res) => {
    let customerId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!customerId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let user = await Customer.findOne({ where: { id: customerId }})
        if (user === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }

        return res.json({ data: user })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addCustomer = async (req, res) => {
    const { email, password, is_company, notifications } = req.body

    // Validation des données reçues
    if (!email || !password || !is_company, !notifications) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification si l'utilisateur existe déjà
        const user = await Customer.findOne({ where: { email: email }, raw: true })
        if (user !== null) {
            return res.status(409).json({ message: `The user ${email} already exists !` })
        }
        const hash = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        let userc = await Customer.create({...req.body, password: hash})
    
        return res.json({ message: 'Customer Created', data: { userc } })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updateCustomer = async (req, res) => {
    let customerId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!customerId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let user = await Customer.findOne({ where: {id: customerId}, raw: true})
        if(user === null){
            return res.status(404).json({ message: 'This user does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Customer.update(req.body, { where: {id: customerId}})
        return res.json({ message: 'Customer Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.untrashCustomer =  (req, res) => {
    let customerId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!customerId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    
    Customer.restore({ where: {id: customerId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashCustomer = (req, res) => {
    let customerId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!customerId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Customer.destroy({ where: {id: customerId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteCustomer =  (req, res) => {
    let customerId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!customerId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Customer.destroy({ where: {id: customerId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}