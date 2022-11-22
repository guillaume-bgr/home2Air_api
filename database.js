const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('home2air', 'root', '', {
    host: 'localhost',
	dialect: 'mysql'
});

const db = {}
// Définitions des modèles
db.sequelize = sequelize
db.Customer = require('./models/Customer');
db.Order = require('./models/Order');
// db.Park = require('./models/Park')(sequelize)
// db.Sensor = require('./models/Sensor')(sequelize)
// db.SensorHistory = require('./models/SensorHistory')(sequelize)
// db.Ticket = require('./models/Ticket')(sequelize)

// Définitions des relations
// db.Customer.hasMany(db.Order, {foreignKey: 'id', onDelete: 'cascade'})
// Customer.hasMany(Order,{as: 'orders', foreignKey: 'userId'})
// db.Customer.hasMany(db.Sensor, {foreignKey: 'user_id', onDelete: 'cascade'})
// db.Customer.hasMany(db.Park, {foreignKey: 'user_id', onDelete: 'cascade'})
// db.Cocktail.belongsTo(db.User, {foreignKey: 'user_id'})
db.sequelize.sync({alter: true});
module.exports = db