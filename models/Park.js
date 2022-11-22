const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('home2air', 'root', '', {
    host: 'localhost',
	dialect: 'mysql'
});
class Park extends Model {
	
}

Park.init({
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
	user_id: {
		type: DataTypes.INTEGER,
		references: {
			model: User,
			key: 'id',
		},
	}
	}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Park' // We need to choose the model name
});

	exports.Park = Park;