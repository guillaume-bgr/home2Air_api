const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('home2air', 'root', '', {
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
    },
    host: 'localhost',
	dialect: 'mysql',
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

db.sequelize.sync({alter: true});
module.exports = db