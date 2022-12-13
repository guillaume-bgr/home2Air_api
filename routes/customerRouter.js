const CustomerController = require('../controllers/CustomerController');
module.exports = (app) => {
    app.group("/customers", (router) => {
        router.get("/", CustomerController.getAllCustomers); // FindAll
        router.post('/create', CustomerController.addCustomer); // Create
        router.post('/authenticate', CustomerController.authenticateCustomer); // Authenticate
        router.patch('/:id', CustomerController.updateCustomer); // Update
        router.delete('/:id', CustomerController.deleteCustomer); // Delete
        router.get('/:id', CustomerController.getCustomer); // FindOne
    });
}