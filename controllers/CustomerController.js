const db = require('./../models/index');
const Customer = db['Customers'];
const Building = db['Buildings'];
const Company = db['Companies'];
const Role = db['Roles'];
const Ticket = db['Tickets'];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**********************************/
/*** Routage de la ressource Customer */
exports.getAllCustomers = (req, res) => {
    Customer.findAll({
        include: [
            {
                model: Building,
                through: {
                    attributes: ["isOwner"],
                },
            },
            {
                model: Role,
                as: "Roles"
            },
            {
                model: Company,
                as: "Companies"
            },
            {
                model: Ticket,
                as: "Tickets"
            },
        ],
    })
    .then(customers => res.json({ count: customers.length, customers:customers }))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getCustomer = async (req, res) => {
    let customerId = parseInt(req.params.id)
    if (!customerId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }
    try {
        let customer = await Customer.findOne({ include: ["Roles", "Companies", "Tickets"], where: { id: customerId }})
        if (customer === null) {
            return res.status(404).json({ message: 'This customer does not exist !' })
        }
        {
            return res.json(customer)
        }
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addCustomer = async (req, res) => {
    const { email, password } = req.body
    if ( !email || !password ) {
        return res.status(400).json({ message: 'Missing Data' })
    }
    try {
        const customer = await Customer.findOne({ where: { email: email }, raw: true })
        if ( customer !== null ) {
            return res.status(409).json({ message: `The customer ${email} already exists !` })
        }
        const hash = await bcrypt.hash(password, 10);
        let customerc = await Customer.create({...req.body, password: hash})
        return res.status(201).json(customerc)
    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updateCustomer = async (req, res) => {
    let customerId = parseInt(req.params.id)
    if (!customerId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    try{
        let customer = await Customer.findOne({ where: {id: customerId}, raw: true})
        if(!customer) {
            return res.status(404).json({ message: 'This customer does not exist !' })
        }
        await Customer.update(req.body, { where: {id: customerId} })
        return res.json({ message: 'Customer Updated' })
    } catch(err){ 
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.deleteCustomer = async (req, res) => {
    let customerId = parseInt(req.params.id)
    if (!customerId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    let customer = await Customer.findOne({ where: { id: customerId }})
    if (customer) {
        customer.destroy()
        .then(() => res.status(200).json({ message: 'Customer deleted' }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } else {
        res.status(404).json({ message: "Customer not found"})
    }
}

exports.authenticateCustomer = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password ) {
        return res.status(400).json({ message: 'Missing Data' })
    }
    try {
        const customer = await Customer.findOne({ include: ["Roles", "Companies"], where: { email: email }, raw: true })
        if (customer == null) {
            return res.status(404).json({ message: `Customer not found.` })
        }
        else {
            hash = customer.password
            bcrypt.compare(password, hash, function(err, response) {
                if (response) {
                    let token = generateJWT({ email: email, id: customer.id }, "24h")
                    let refresh = generateJWT({id: customer.id}, "24h")
                    customer.password = undefined;
                    return res.status(200).json({ message: 'Authenticated', data: { token, refresh, customer  } })
                } else {
                    res.status(500).json({ message: 'Hash process Error', error: err})    
                }
            })
        }
    } catch(err) { 
        console.log(err)
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

function generateJWT(payload, expiresIn) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn })
}
