const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('home2air', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
});
class Order extends Model {
	static associate(models) {
		Order.belongsTo(models.Customer, {
			foreignKey: 'customer_id',
	})
	}
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
	customer_id: {
		type: DataTypes.INTEGER,
		references: {
		model: "customers",
		key: 'id',
		}
	},
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Order', // We need to choose the model name
	timestamps: false,
});


module.exports = Order;