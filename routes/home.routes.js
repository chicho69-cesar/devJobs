const { Router } = require('express')

const { showWorks, customError404 } = require('../controllers/home.controller')

const router = Router()

router.get('/', showWorks)
// router.get('*', customError404)

module.exports = router
