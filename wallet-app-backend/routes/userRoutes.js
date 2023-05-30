const express = require('express')

const {
  register,
  login,
  currentUser,
  getUsers,
  verify,
} = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/current_user').get(protect, currentUser)
router.route('/get_users').get(protect, getUsers)
router.route('/verify/:id').put(protect, admin, verify)

module.exports = router
