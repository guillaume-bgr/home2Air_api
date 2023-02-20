const ParkController = require('../controllers/ParkController.js');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/parks", (router) => {
        router.get("/", ParkController.getAllParks); // FindAll
        router.post('/create', ParkController.addPark); // Create
        router.patch('/:id', authToken, ParkController.updatePark); // Update
        router.delete('/:id', authToken, ParkController.deletePark); // Delete
        router.get('/:id', ParkController.getPark); // FindOne
    });
}