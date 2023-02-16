const BuildingController = require('../controllers/BuildingController');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/buildings", (router) => {
        router.get("/", BuildingController.getBuildings); // FindBuildings
        router.get("/:id", BuildingController.getBuilding); // FindBuilding
        router.get("/user/:id", BuildingController.getCustomerBuildings); // FindUserBuildings
        router.post('/create', authToken, BuildingController.addBuilding); // Create
        router.patch('/:id', authToken, BuildingController.updateBuilding); // Update
        // router.delete('/:id', BuildingController.deleteCompany); // Delete
        // router.get('/:id', BuildingController.getCompany); // FindOne
    });
}