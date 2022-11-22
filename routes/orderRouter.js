const OrderController = require('../controllers/OrderController');
module.exports = (app) => {
    app.group("/orders", (router) => {
        router.get("/", OrderController.getAllOrders); // FindAll
        router.post('/create', OrderController.addOrder); // Create
        router.patch('/:id', OrderController.updateOrder); // Update
        router.delete('/:id', OrderController.deleteOrder); // Delete
        router.get('/:id', OrderController.getOrder); // FindOne
    });
}