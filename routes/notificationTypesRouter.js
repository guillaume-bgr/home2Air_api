const NotificationsTypeController = require('../controllers/NotificationsTypeController');
const authToken = require('../middleware/authToken');
module.exports = (app) => {
    app.group("/notificationstype", (router) => {
        router.get("/", authToken, NotificationsTypeController.getNotificationsTypes); // FindAll
        router.post('/create', NotificationsTypeController.addNotificationTypes); // Create
        router.patch('/:id', authToken, NotificationsTypeController.updateNotificationTypes); // Update
        router.delete('/:id', authToken, NotificationsTypeController.deleteNotificationTypes); // Delete
    });
}