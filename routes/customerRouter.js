const CustomerController = require('../controllers/CustomerController');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/customers", (router) => {
        router.get("/", authToken, CustomerController.getAllCustomers); // FindAll
        router.get('/:id', CustomerController.getCustomer); // FindOne
        router.post('/create', CustomerController.addCustomer); // Create
        router.patch('/:id', authToken, CustomerController.updateCustomer); // Update
        router.delete('/:id', authToken, CustomerController.deleteCustomer); // Delete
        router.post('/authenticate', CustomerController.authenticateCustomer); // Authenticate
        router.get('/:id/findrole', authToken, CustomerController.getCustomerRoleById); // FindRole
    });
}