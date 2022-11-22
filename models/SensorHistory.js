const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('home2air', 'root', '', {
    host: 'localhost',
	dialect: 'mysql'
});
class SensorHistory extends Model {
	
}

SensorHistory.init({
	// Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	co: {
		type: DataTypes.FLOAT,
	},
	no2: {
		type: DataTypes.FLOAT,
	},
	nh3: {
		type: DataTypes.FLOAT,
	},
    date: {
		type: DataTypes.DATE,
	},
	sensor_id: {
		type: DataTypes.INTEGER,
		references: {
			model: Sensor,
			key: 'id',
		},
	}
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'SensorHistory' // We need to choose the model name
});

exports.SensorHistory = SensorHistory;