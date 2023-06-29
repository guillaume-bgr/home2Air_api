const models = require('./../models/index');
const Customer = models['Customers'];

async function verifyUserRights(req, res, next) {
    // let customer = await Customer.findOne({ include: { all: true, nested: true }, where: { id: res.tokenId }, raw: false})
    // if (req.baseUrl.includes('customers')) {
    //     if (parseInt(customer.id) !== parseInt(req.params.id)) {
    //         if (customer.Roles.name !== 'ADMIN') {
    //             return res.status(401).json({ message: 'Not allowed to access this ressource' });
    //         }
    //     }
    // } else if (req.baseUrl.includes('buildings')) {
    //     let building = customer.Buildings.find((building) => {
    //         return building.id === parseInt(req.params.id)
    //     })
    //     if (!building) {
    //         return res.status(401).json({ message: 'Not allowed to access this ressource' });
    //     }
    // } else if (req.baseUrl.includes('parks')) {
    //     customer.Buildings.forEach(building => {
    //         building.Parks.forEach(park => {
    //             if (park.id == parseInt(req.params.id)) {
                    
    //             }
    //             console.log('-----------------------')
    //             console.log('-----------------------')
    //             console.log('-----------------------')
    //             console.log(park)
    //         })
    //     });
    //     // console.log(parks);
    //     // if (customer.Companies.id !== parseInt(req.params.id)){
    //     //     if (customer.Roles.name !== 'ADMIN') {
    //     //         return res.status(401).json({ message: 'Not allowed to access this ressource' });
    //     //     }
    //     // }
    // }
    next();
}

module.exports = verifyUserRights