const CompanyController = require('../controllers/CompanyController');
module.exports = (app) => {
    app.group("/companies", (router) => {
        router.get("/", CompanyController.getAllCompanies); // FindAll
        router.post('/create', CompanyController.addCompany); // Create
        router.patch('/:id', CompanyController.updateCompany); // Update
        router.delete('/:id', CompanyController.deleteCompany); // Delete
        router.get('/:id', CompanyController.getCompany); // FindOne
    });
}