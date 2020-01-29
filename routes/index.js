const router = require('express').Router()
const menuRoutes = require('./menu')
const restaurantRoutes = require('./restaurant')

router.use('/menus', menuRoutes)
router.use('/restaurants', restaurantRoutes)
module.exports = router