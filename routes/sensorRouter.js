const SensorController = require('../controllers/SensorController.js');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/sensors", (router) => {
        router.get("/", SensorController.getAllSensors); // FindAll
        router.post('/create', SensorController.createSensor); // Create
        router.patch('/:id', authToken, SensorController.updateSensor); // Update
        router.delete('/:id', authToken, SensorController.deleteSensor); // Delete
        router.get('/:id', SensorController.getSensor); // FindOne
    });
}