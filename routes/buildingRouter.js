const BuildingController = require('../controllers/BuildingController');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/buildings", (router) => {
        router.get("/", BuildingController.getAllCompanies); // FindAll
        router.post('/create', BuildingController.addCompany); // Create
        router.patch('/:id', BuildingController.updateCompany); // Update
        router.delete('/:id', BuildingController.deleteCompany); // Delete
        router.get('/:id', BuildingController.getCompany); // FindOne
    });
}