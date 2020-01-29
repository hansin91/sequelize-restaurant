const { Menu, Restaurant } = require('../models')
const convertCurrency = require('../helpers/convertCurrency')

class MenuController {
  static getAll(req, res) {
    const error = req.query.err
    Promise.all([Menu.findAll({
      include: [Restaurant],
      order: [
        ['id', 'ASC']
      ]
    }), Restaurant.findAll()])
      .then(result => {
        const menus = result[0]
        const restaurants = result[1]
        res.render('pages/menu', { convertCurrency, menus, error, restaurants, type: 'add', input: '' })
      })
      .catch(err => res.send(err))
  }

  static create(req, res) {
    const parameters = {
      name: req.body.name,
      menu_type: req.body.menu_type,
      rating: req.body.rating,
      price: req.body.price,
      restaurant_id: req.body.restaurant_id
    }

    Menu.create(parameters)
      .then(newMenu => res.redirect('/menus'))
      .catch(err => {
        const error = err.errors[0].message
        res.redirect('/menus?err=' + error)
      })
  }

  static update(req, res) {
    const id = +req.params.id
    const parameters = {
      name: req.body.name,
      menu_type: req.body.menu_type,
      rating: req.body.rating,
      price: req.body.price,
      restaurant_id: req.body.restaurant_id
    }

    Menu.update(parameters, {
      where: {
        id
      }
    })
      .then(updated => res.redirect('/menus'))
      .catch(err => res.send(err))
  }

  static renderEditFormMenu(req, res) {
    const id = +req.params.id
    Promise.all([Menu.findOne({
      where: {
        id
      }
    })
      , Restaurant.findAll()
    ]
    )
      .then(result => {
        res.render('pages/menu-edit', { restaurants: result[1], type: 'edit', input: result[0] })
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }

  static deleteMenu(req, res) {
    const id = +req.params.id
    Menu.destroy({
      where: {
        id
      }
    })
      .then(menu => res.redirect('/menus'))
      .catch(err => res.send(err))
  }

}

module.exports = MenuController