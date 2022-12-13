const SubscriptionController = require('../controllers/SubscriptionController');
module.exports = (app) => {
    app.group("/subscriptions", (router) => {
        router.get("/", SubscriptionController.getAllSubscriptions); // FindAll
        router.post('/create', SubscriptionController.addSubscription); // Create
        router.patch('/:id', SubscriptionController.updateSubscription); // Update
        router.delete('/:id', SubscriptionController.deleteSubscription); // Delete
        router.get('/:id', SubscriptionController.getSubscription); // FindOne 
    });
}