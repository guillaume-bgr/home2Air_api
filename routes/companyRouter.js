const CompanyController = require('../controllers/CompanyController');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/companies", (router) => {
        router.get("/", CompanyController.getAllCompanies); // FindAll
        router.post('/create', CompanyController.addCompany); // Create
        router.patch('/:id', authToken, CompanyController.updateCompany); // Update
        router.delete('/:id', authToken, CompanyController.deleteCompany); // Delete
        router.get('/:id', CompanyController.getCompany); // FindOne
        router.get("/:id/user/:idUser", CompanyController.getInvitedCompanies); // FindInvitedCompanies
        router.get("/user/:idUser", CompanyController.getMyCompanies); // FindYourCompanies
    });
}