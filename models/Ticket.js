const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('home2air', 'root', '', {
    host: 'localhost',
	dialect: 'mysql'
});
class Ticket extends Model {
	
}

Ticket.init({
	// Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	subject: {
		type: DataTypes.STRING,
	},
	content: {
		type: DataTypes.STRING,
	},
	user_id: {
		type: DataTypes.INTEGER,
		references: {
			model: User,
			key: 'id',
		},
	}
	}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Ticket' // We need to choose the model name
});

exports.Ticket = Ticket;