const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('home2air_api', 'root', '', {
    host: 'localhost',
	dialect: 'mysql'
});
class Order extends Model {
	
}

Order.init({
  // Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	post_code: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	is_delivered: {
		type: DataTypes.BOOLEAN,
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
	modelName: 'Order' // We need to choose the model name
});