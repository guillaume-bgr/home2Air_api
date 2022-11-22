const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('home2air', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
});
class Customer extends Model {
	toJSON() {
		return {
			...this.get(), password: undefined
		}
	}
	static associate(models) {
		Customer.hasMany(models.Order, {foreignKey: 'customer_id'})
	}
}
Customer.init({
  // Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	first_name: {
		type: DataTypes.STRING,
	},
	last_name: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	is_company: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	notifications: {
		type: DataTypes.BOOLEAN,
	},
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Customer', // We need to choose the model name
	timestamps: false,
});
module.exports = Customer;