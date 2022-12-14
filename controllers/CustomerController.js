const db = require('./../models/index');
const Customer = db['Customers'];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**********************************/
/*** Routage de la ressource Customer */
exports.getAllCustomers = (req, res) => {
    if (res.tokenRole == "ADMIN") {
        Customer.findAll({
            include: ["Roles", "Companies"]
        })
            .then(customers => res.json({ data: customers }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

exports.getCustomer = async (req, res) => {
    let customerId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!customerId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let customer = await Customer.findOne({ include: ["Roles", "Companies"], where: { id: customerId }})
        if (customer === null) {
            return res.status(404).json({ message: 'This customer does not exist !' })
        }

        return res.json({ data: customer })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.getCustomerRoleById = async (req, res) => {

    // Vérification si le champ id est présent et cohérent
    if (!parseInt(res.tokenId)) {
        return res.json(400).json({ message: 'Missing token'})
    }
    try {
        // Récupération de l'utilisateur et vérification
        let customer = await Customer.findOne({attributes: ["Roles.name"], include: ["Roles"], where: { id: parseInt(res.tokenId) }})
        if (customer === null) {
            return res.status(404).json({ message: 'This customer does not exist !' })
        }

        return res.json({ data: customer })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addCustomer = async (req, res) => {
    const { email, password } = req.body

    // Validation des données reçues
    if (!email || !password ) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification si l'utilisateur existe déjà
        const customer = await Customer.findOne({ where: { email: email }, raw: true })
        if (customer !== null) {
            return res.status(409).json({ message: `The customer ${email} already exists !` })
        }
        const hash = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        let customerc = await Customer.create({...req.body, password: hash})
    
        return res.json({ message: 'Customer Created', data: { customerc } })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updateCustomer = async (req, res) => {
    let customerId = parseInt(req.params.id);
    
    // Vérification si le champ id est présent et cohérent
    if (!customerId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Si le token contient bien un rôle et un token
    if (!res.tokenRole || !res.tokenId) {
        return res.status(400).json({ message: 'Missing token' })
    }
    
    if (res.tokenRole == "ADMIN" || customerId === res.tokenId) {
        try{

            // Recherche de l'utilisateur et vérification
            let customer = await Customer.findOne({ where: {id: customerId}, raw: true})
            if(customer === null) {
                return res.status(404).json({ message: 'This customer does not exist !' })
            }
    
            // Mise à jour de l'utilisateur
            await Customer.update(req.body, { where: {id: customerId} })
            return res.json({ message: 'Customer Updated' })
        } catch(err){ 
            return res.status(500).json({ message: 'Database Error', error: err })
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

exports.deleteCustomer = (req, res) => {
    let customerId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!customerId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Si le token contient bien un rôle et un token
    if (!res.tokenRole || !res.tokenId) {
        return res.status(400).json({ message: 'Missing token' })
    }

    if (res.tokenRole == "ADMIN" || customerId === res.tokenId) {
        // Suppression de l'utilisateur
        Customer.destroy({ where: {id: customerId}, force: true})
            .then(() => res.status(200).json({ message: 'Customer deleted' }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

exports.authenticateCustomer = async (req, res) => {
    const { email, password } = req.body;

    // Validation des données reçues
    if (!email || !password ) {
        return res.status(400).json({ message: 'Missing Data' });
    }

    try {
        // Vérification si l'utilisateur existe déjà
        const customer = await Customer.findOne({ include: ["Roles", "Companies"], where: { email: email }, raw: true })
        if (customer == null) {
            return res.status(404).json({ message: `Customer not found.` })
        }
        else {
            hash = customer.password;
            bcrypt.compare(password, hash, function(err, response) {
                if (response == true) {
                    let token = generateJWT({ email: email, id: customer.id, company_id: customer["Companies.id"], role: customer["Roles.name"] }, "24h");
                    let refresh = generateJWT({id: customer.id}, "24h");
                    return res.status(200).json({ message: 'Authenticated', data: { token, refresh } });
                }
            })
        }

    } catch(err) { 
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

function generateJWT(payload, expiresIn) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn })
}