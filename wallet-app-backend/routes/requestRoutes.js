const express = require('express')

const {
  requestAmount,
  getAllRequest,
  updateRequestStats,
  getRequestSendTransaction,
  getRequestReceivedTransaction,
} = require('../controllers/requestController')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/request').post(protect, requestAmount)
router.route('/get-request').post(protect, getAllRequest)
router.route('/update-request-status').post(protect, updateRequestStats)
router.route('/request-send').get(protect, getRequestSendTransaction)
router.route('/request-received').get(protect, getRequestReceivedTransaction)

module.exports = router
