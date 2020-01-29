const { Op } = require('sequelize')

'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Menu = sequelize.define('Menu', {
  //   name: DataTypes.STRING,
  //   menu_type: DataTypes.STRING,
  //   rating: DataTypes.INTEGER,
  //   price: DataTypes.INTEGER
  // }, {});
  const Model = sequelize.Sequelize.Model
  class Menu extends Model { }
  Menu.init({
    name: {
      type: DataTypes.STRING,
    },
    menu_type: {
      type: DataTypes.STRING,
      validate: {
        menuTypeValidation: (value, next) => {
          if (value.toLowerCase() === 'food' || value.toLowerCase() === 'drink') {
            next()
          } else {
            next('Isi menu type dengan food / drink')
          }
        }
      }
    },
    rating: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    restaurant_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (menu, options) => {
        if (menu.menu_type === 'food') {
          if (menu.price === '0' || !menu.price) {
            menu.price = 15000
          }
        }

        if (menu.menu_type === 'drink') {
          if (menu.price === '0' || !menu.price) {
            menu.price = 10000
          }
        }
      },
      beforeBulkUpdate: (menu, options) => {
        if (menu.attributes.menu_type === 'food') {
          if (menu.attributes.price === '0' || !menu.attributes.price) {
            menu.attributes.price = 15000
          }
        }

        if (menu.attributes.menu_type === 'drink') {
          if (menu.attributes.price === '0' || !menu.attributes.price) {
            menu.attributes.price = 10000
          }
        }
      }
    },
  })
  Menu.associate = function (models) {
    // associations can be defined here
    Menu.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' })
  };
  return Menu;
};