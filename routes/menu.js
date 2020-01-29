const router = require('express').Router()
const MenuController = require('../controllers/menu')

router.get('/:id/edit', MenuController.renderEditFormMenu)
router.post('/:id/edit', MenuController.update)
router.get('/:id/delete', MenuController.deleteMenu)
router.get('/', MenuController.getAll)
router.post('/', MenuController.create)
module.exports = router