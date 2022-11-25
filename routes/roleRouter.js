const RoleController = require('../controllers/RoleController');
module.exports = (app) => {
    app.group("/roles", (router) => {
        router.get("/", RoleController.getAllRoles); // FindAll
        router.post('/create', RoleController.addRole); // Create
        router.patch('/:id', RoleController.updateRole); // Update
        router.delete('/:id', RoleController.deleteRole); // Delete
        router.get('/:id', RoleController.getRole); // FindOne
    });
}