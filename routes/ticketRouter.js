const TicketController = require('../controllers/TicketController');
module.exports = (app) => {
    app.group("/tickets", (router) => {
        router.get("/", TicketController.getAllTickets); // FindAll
        router.post('/create', TicketController.addTicket); // Create
        router.patch('/:id', TicketController.updateTicket); // Update
        router.delete('/:id', TicketController.deleteTicket); // Delete
        router.get('/:id', TicketController.getTicket); // FindOne
    });
}