const CustomerController = require('../controllers/CustomerController');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/customers", (router) => {
        router.get("/", CustomerController.getAllCustomers); // FindAll
        router.post('/create', CustomerController.addCustomer); // Create
        router.post('/authenticate', CustomerController.authenticateCustomer); // Authenticate
        router.patch('/:id', authToken, CustomerController.updateCustomer); // Update
        router.delete('/:id', authToken, CustomerController.deleteCustomer); // Delete
        router.get('/:id', CustomerController.getCustomer); // FindOne
    });
}