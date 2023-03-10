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
    static associate(models) {
      Notifications.belongsTo(models.Roles, {
        as: 'Notification_Types',
        foreignKey: 'notifications_type',
      })
    }
  }
  Notifications.init({
    customers_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    read_at: DataTypes.DATE,
    notifications_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};