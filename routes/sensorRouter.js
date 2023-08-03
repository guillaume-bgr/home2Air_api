const SensorController = require('../controllers/SensorController.js');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/sensors", (router) => {
        router.get("/", SensorController.getAllSensors); // FindAll
        router.post('/create', SensorController.addSensor); // Create
        router.patch('/:id', SensorController.updateSensor); // Update
        router.delete('/:id', SensorController.deleteSensor); // Delete
        router.get('/:id', SensorController.getSensor); // FindOne
        router.get('/sensor-history/:id', SensorController.getSensorHistory); 
        router.post('/save-input/:id', SensorController.saveSensorInput);
        router.post('/aqi', SensorController.calculateAqi);
        router.post('/fake-data', SensorController.createFakeData);
        router.get('/:id/data-over-time', authToken, SensorController.getDataOverTime);
    });
}