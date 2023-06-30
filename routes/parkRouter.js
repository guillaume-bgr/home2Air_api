const ParkController = require('../controllers/ParkController.js');
const authToken = require('../middleware/authToken');
const verifyUserRights = require('../middleware/verifyUserRights.js');
module.exports = (app) => {
    app.group("/parks", (router) => {
        router.get("/", authToken, verifyUserRights, ParkController.getAllParks); // FindAll
        router.post("/research", ParkController.getParksByNameResearch); // FindAll
        router.post('/create', ParkController.addPark); // Create
        router.patch('/:id', authToken, verifyUserRights, ParkController.updatePark); // Update
        router.delete('/:id', authToken, verifyUserRights, ParkController.deletePark); // Delete
        router.get('/:id', authToken, verifyUserRights, ParkController.getPark); // FindOne
        router.get('/:id/sensors', authToken, verifyUserRights, ParkController.getParkSensors); //FindParkSensors
    });
}