'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Notifications.init({
    customers_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    read_at: DataTypes.BOOLEAN,
    notifications_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};