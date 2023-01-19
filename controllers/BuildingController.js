const db = require('./../models/index');
const Building = db['Buildings'];
const Customer = db['Customers'];

/**********************************/
/*** Routage de la ressource Building */
exports.getUserBuildings = (req, res) => {
    customerId = req.params.id;
    Building.findAll({
        where: { customers_id: customerId },
        include: [
        'Customers'
        ]
    })
    .then(companies => res.json({ data: companies }))
    // .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    .catch(err => console.log(err));
}

exports.addBuilding = async (req, res) => {
const { name } = req.body

// Validation des données reçues
if ( !name ) {
    return res.status(400).json({ message: 'Missing Data' })
}
console.log(res.tokenId )
try {
    // Vérification si l'utilisateur existe déjà
    const customer = await Customer.findOne({ where: { id: res.tokenId }, raw: true })
    if (customer == null) {
        return res.status(409).json({ message: `The customer does not exist !` })
    }

    // Création de l'utilisateur
    let building = await Building.create({...req.body, customers_id: res.tokenId})

    return res.json({ message: 'Customer Created', data: { building } })

}catch(err){
    console.log(err)
    if(err.name == 'SequelizeDatabaseError'){
        res.status(500).json({ message: 'Database Error', error: err })
    }
    res.status(500).json({ message: 'Hash Process Error', error: err})        
}
}