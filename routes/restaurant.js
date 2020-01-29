const router = require('express').Router()
const RestaurantController = require('../controllers/restaurant')
router.get('/', RestaurantController.getAll)
router.get('/:id/search', RestaurantController.renderSearchForm)
router.post('/:id/search', RestaurantController.searchRestaurant)
router.get('/:id/view_menu', RestaurantController.findOne)

module.exports = router