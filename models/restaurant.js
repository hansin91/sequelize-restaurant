'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Restaurant = sequelize.define('Restaurant', {
  //   name: DataTypes.STRING,
  //   addres: DataTypes.STRING
  // }, {});
  const Model = sequelize.Sequelize.Model
  class Restaurant extends Model { }
  Restaurant.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, { sequelize })
  Restaurant.associate = function (models) {
    // associations can be defined here
    Restaurant.hasMany(models.Menu, { foreignKey: 'id' })
  };
  return Restaurant;
};