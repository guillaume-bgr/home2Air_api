const CustomerController = require('../controllers/CustomerController');
const verifyUserRights = require('../middleware/verifyUserRights');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/customers", (router) => {
        router.get("/", authToken, verifyUserRights, CustomerController.getAllCustomers); // FindAll
        router.get('/:id', authToken, verifyUserRights, CustomerController.getCustomer); // FindOne
        router.post('/create', CustomerController.addCustomer); // Create
        router.patch('/:id', authToken, verifyUserRights, CustomerController.updateCustomer); // Update
        router.delete('/:id', authToken, verifyUserRights, CustomerController.deleteCustomer); // Delete
        router.post('/authenticate', CustomerController.authenticateCustomer); // Authenticate
    });
}