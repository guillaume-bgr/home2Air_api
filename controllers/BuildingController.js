const db = require('./../models/index');
const Building = db['Buildings'];

/**********************************/
/*** Routage de la ressource Building */
exports.getUserBuildings = (req, res) => {
    customerId = req.params.id;
    Building.findAll({
        include: [
          'Customers'
        ]
    })
        .then(companies => res.json({ data: companies }))
        // .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
        .catch(err => console.log(err));
}