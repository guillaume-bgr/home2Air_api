const NotificationController = require('../controllers/NotificationController');
module.exports = (app) => {
    app.group("/notifications", (router) => {
        router.get("/", NotificationController.getAllNotifications); // FindAll
        router.post('/create', NotificationController.addNotification); // Create
        router.patch('/:id', NotificationController.updateNotification); // Update
        router.delete('/:id', NotificationController.deleteNotification); // Delete
        router.get('/:id', NotificationController.getNotification); // FindOne
    });
}