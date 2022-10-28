const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('home2air_api', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
});
class User extends Model {
}

User.init({
  // Model attributes are defined here
  id: {
	type: DataTypes.INTEGER,
	autoIncrement: true,
	primaryKey: true,
	allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
	type: DataTypes.STRING,
	allowNull: false,
  },
  password: {
	type: DataTypes.STRING,
	allowNull: false,
  },
  isCompany: {
	type: DataTypes.BOOLEAN,
	allowNull: false,
  },
  notifications: {
	type: DataTypes.BOOLEAN,
  }
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'Customer' // We need to choose the model name
});