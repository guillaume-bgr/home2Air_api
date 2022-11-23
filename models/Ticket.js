'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasOne(models.Customer, {
        foreignKey: 'customer_id',
      })
    }
  }
  Ticket.init({
    status: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};