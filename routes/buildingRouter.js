const BuildingController = require('../controllers/BuildingController');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/buildings", (router) => {
        router.get("/", BuildingController.getBuildings); // FindBuildings
        router.get("/:id", BuildingController.getBuilding); // FindBuilding
        router.post('/create', authToken, BuildingController.addBuilding); // Create
        router.patch('/:id', authToken, BuildingController.updateBuilding); // Update
        router.delete('/:id', authToken, BuildingController.deleteBuilding); // Delete
    });
}