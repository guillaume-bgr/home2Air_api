const NotificationController = require('../controllers/NotificationController');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/notifications", (router) => {
        router.get("/", authToken, NotificationController.getAllNotifications); // FindAll
        router.post('/create', NotificationController.addNotification); // Create
        router.patch('/:id', authToken, NotificationController.updateNotification); // Update
        router.delete('/:id', authToken, NotificationController.deleteNotification); // Delete
        router.get('/:id', NotificationController.getNotification); // FindOne
    });
}