'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parks.init({
    name: DataTypes.STRING,
    companies_id: DataTypes.INTEGER,
    customers_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Parks',
  });
  return Parks;
};