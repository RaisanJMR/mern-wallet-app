const express = require('express')

const uploadImage = require('../controllers/uploadController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/upload').post(uploadImage)

module.exports = router
