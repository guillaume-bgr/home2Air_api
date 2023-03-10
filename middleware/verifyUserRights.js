const models = require('./../models/index');
const Customer = models['Customers'];

async function verifyUserRights(req, res, next) {
    let customer = await Customer.findOne({ include: ["Roles", "Companies", "Tickets", "Buildings"], where: { id: res.tokenId }})
    if (req.baseUrl.includes('customers')) {
        if (parseInt(customer.id) !== parseInt(req.params.id)) {
            if (customer.Roles.name !== 'ADMIN') {
                return res.status(401).json({ message: 'Not allowed to access this ressource' });
            }
        }
    } else if (req.baseUrl.includes('buildings')) {
        let building = customer.Buildings.find((building) => {
            return building.id === parseInt(req.params.id)
        })
        if (!building) {
            return res.status(401).json({ message: 'Not allowed to access this ressource' });
        }
    }
    next();
}

module.exports = verifyUserRights