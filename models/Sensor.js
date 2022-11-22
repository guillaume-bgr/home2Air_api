const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('home2air', 'root', '', {
    host: 'localhost',
	dialect: 'mysql'
});
class Sensor extends Model {
	
}

Sensor.init({
	// Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
	},
	park_id: {
		type: DataTypes.INTEGER,
		references: {
			model: Park,
			key: 'id',
		},
	},
	customer_id: {
		type: DataTypes.INTEGER,
		references: {
			model: Customer,
			key: 'id',
		},
	}
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Sensor' // We need to choose the model name
});

exports.User = User;