const asyncHandler = require('express-async-handler')
const Request = require('../models/requestModal')
const Transaction = require('../models/transactionModal')
const User = require('../models/userModal')
const crypto = require('crypto')

// @desc    send request to another user
// @route   POST /api/request
// @access  Private

const requestAmount = asyncHandler(async (req, res) => {
  const { receiver, amount, description } = req.body
  const moneyreceiver = await User.findById(receiver)
  if (req.user._id == receiver || !moneyreceiver) {
    res.status(400)
    throw new Error('request not send')
  } else {
    try {
      if (!receiver || !amount || !description) {
        res.status(400)
        throw new Error('please include all fields')
      }
      const request = new Request({
        sender: req.user._id,
        receiver,
        amount,
        description,
      })
      await request.save()
      await User.findByIdAndUpdate(
        receiver,
        { $inc: { requestReceived: 1 } },
        { new: true }
      )
      res.status(201).json(request)
    } catch (error) {
      throw new Error(error)
    }
  }
})

// @desc    get all request for a user
// @route   POST /api/get-request
// @access  Private
const getAllRequest = asyncHandler(async (req, res) => {
  // console.log(req.user)
  try {
    const requests = await Request.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate('sender')
      .populate('receiver')
      .sort({ createdAt: -1 })
      
    if (requests) {
      return res.status(200).json(requests)
    }
  } catch (error) {
    res.status(404)
    throw new Error(error)
  }
})

const getRequestSendTransaction = asyncHandler(async (req, res) => {
  const requests = await Request.find({ sender: req.user._id })
    .sort({ createdAt: -1 })
    .populate([
      { path: 'sender', select: 'name image' },
      { path: 'receiver', select: 'name image' },
    ])
  if (requests) {
    res.status(200).json(requests)
  } else {
    res.status(400)
    throw new Error('no requests send')
  }
})
const getRequestReceivedTransaction = asyncHandler(async (req, res) => {
  const requests = await Request.find({ receiver: req.user._id })
    .sort({ createdAt: -1 })
    .populate([
      { path: 'sender', select: 'name image' },
      { path: 'receiver', select: 'name image' },
    ])
  if (requests) {
    res.status(200).json(requests)
  } else {
    res.status(400)
    throw new Error('no requests received')
  }
})

// @desc    update request status
// @route   POST /api/update-request-status
// @access  Private
const updateRequestStats = asyncHandler(async (req, res) => {
  const { _id, sender, receiver, amount, transactionType, reference, status } =
    req.body

  try {
    if (status === 'accepted') {
      const transaction = await Transaction.create({
        sender: sender,
        receiver: receiver,
        amount: amount,
        transactionType: transactionType,
        transactionId: crypto.randomBytes(5).toString('hex'),
        reference: reference,
      })

      // await transaction.save()

      // deduct the amount from the sender
      await User.findByIdAndUpdate(sender, {
        $inc: { balance: -amount },
      })

      // add the amount to the receiver
      await User.findByIdAndUpdate(receiver, {
        $inc: { balance: amount },
      })
      res.status(201).json(transaction)

      await Request.findByIdAndUpdate(
        _id,
        {
          status: status,
        },
        { new: true }
      )
    }
  } catch (error) {
    res.status(404)
    throw new Error(error)
  }
})

module.exports = {
  requestAmount,
  getAllRequest,
  updateRequestStats,
  getRequestSendTransaction,
  getRequestReceivedTransaction,
}
