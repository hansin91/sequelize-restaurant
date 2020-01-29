const { Restaurant, Menu } = require('../models')
const { Op } = require('sequelize')

class RestaurantController {
  static getAll(req, res) {
    Restaurant.findAll({
      include: [Menu],
      order: [
        ['id', 'ASC']
      ]
    })
      .then(restaurants => res.render('pages/restaurants', { restaurants }))
      .catch(err => res.send(err))
  }

  static renderSearchForm(req, res) {
    const id = req.params.id
    Restaurant.findOne({
      where: {
        id
      },
      include: [Menu]
    })
      .then(restaurant => {
        res.render('pages/restaurant-search', { restaurant })
      })
      .catch(err => res.send(err))
  }

  static searchRestaurant(req, res) {
    const { search_by, keyword } = req.body
    const restaurant_id = +req.params.id
    let condition = ''
    if (search_by === 'name' || search_by === 'menu_type') {
      condition = {
        [search_by]: {
          [Op.iLike]: `%${keyword}%`
        }
      }
    } else {
      condition = {
        [search_by]: keyword
      }
    }

    Promise.all([
      Restaurant.findOne({
        where: {
          id: restaurant_id
        }
      }),
      Menu.findAll({
        where: {
          [Op.and]: [
            {
              restaurant_id
            },
            condition
          ]
        },
        order: [
          ['id', 'ASC']
        ]
      })
    ])
      .then(result => {
        const restaurant = result[0]
        const menus = result[1]
        res.render('pages/restaurant-search', { restaurant, menus })
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }

  static findOne(req, res) {
    const id = +req.params.id
    Promise.all([
      Restaurant.findOne({
        where: {
          id
        }
      }),
      Menu.findAll({
        where: {
          restaurant_id: id
        },
        order: [
          ['id', 'ASC']
        ]
      })
    ])
      .then(result => {
        const restaurant = result[0]
        const menus = result[1]
        res.render('pages/restaurant', { restaurant, menus })
      })
  }
}

module.exports = RestaurantController