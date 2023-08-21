const express = require('express')

const {
  transferAmount,
  getTransactions,
  deposit,
  verifyReceiver,
  getMoneySendTransactions,
  getMoneyReceiveTransactions,
} = require('../controllers/transactionController')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/transfer').post(protect, transferAmount)
router.route('/deposit').post(protect, deposit)
router.route('/verify-receiver').post(protect, verifyReceiver)
router.route('/get_money_send').get(protect, getMoneySendTransactions)
router.route('/get_money_receive').get(protect, getMoneyReceiveTransactions)
router.route('/get_transactions/:id').get(protect, getTransactions)

module.exports = router
