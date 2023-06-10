const asyncHandler = require('express-async-handler')
const User = require('../models/userModal')
const Transaction = require('../models/transactionModal')
const crypto = require('crypto')

// @desc    Transfer money
// @route   POST /api/transfer
// @access  Private
const transferAmount = asyncHandler(async (req, res) => {
  const { amount, sender, receiver, transactionType, reference } = req.body
  const receiverUser = await User.findById(receiver)

  if (
    req.user._id != sender ||
    !receiverUser ||
    req.user.isVerified != true ||
    !receiverUser.isVerified
  ) {
    res.status(400)
    throw new Error('sender not verified or loggedin or receiver not found')
  } else {
    if (!amount || !sender || !receiver || !transactionType || !reference) {
      res.status(400)
      throw new Error('please include all fields')
    }

    const transfer = await Transaction.create({
      amount,
      sender,
      receiver,
      transactionType,
      reference,
      transactionId: crypto.randomBytes(5).toString('hex'),
    })
    await transfer.save()
    await User.findByIdAndUpdate(sender, {
      $inc: { balance: -amount },
    })
    await User.findByIdAndUpdate(receiver, {
      $inc: { balance: amount },
    })
    await User.findByIdAndUpdate(
      sender,
      { $inc: { moneySend: 1 } },
      { new: true }
    )
    await User.findByIdAndUpdate(
      receiver,
      { $inc: { moneyReceived: 1 } },
      { new: true }
    )

    if (transfer) {
      res.status(201).send({
        _id: transfer._id,
        amount: transfer.amount,
        sender: transfer.sender,
        receiver: transfer.receiver,
        transactionType: transfer.transactionType,
        reference: transfer.reference,
        transactionId: transfer.transactionId,
      })
    } else {
      res.status(404)
      throw new Error('not created transfer')
    }
  }
})

// @desc    Transfer money(verify receiver)
// @route   POST /api/verify-receiver
// @access  Private

const verifyReceiver = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver })
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404)
      throw new Error('receiver not found')
    }
  } catch (error) {
    res.status(404)
    throw new Error(error)
  }
})

// @desc    get all transactions from a user
// @route   GET /api/all_transaction
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
  const { id } = req.params
  console.log(id)
  const transactions = await Transaction.find({
    $or: [{ sender: id }, { receiver: id }],
  })
    .sort({ createdAt: -1 })
    .populate([
      { path: 'sender', select: 'name image' },
      { path: 'receiver', select: 'name image' },
    ])
  if (transactions) {
    res.status(200).send(transactions)
  } else {
    res.status(400)
    throw new Error('transaction not found')
  }
})

const getMoneySendTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ sender: req.user._id })
    .sort({ createdAt: -1 })
    .populate([
      { path: 'sender', select: 'name image' },
      { path: 'receiver', select: 'name image' },
    ])

  if (transactions) {
    res.status(200).send(transactions)
  } else {
    res.status(400)
    throw new Error('transactions not found')
  }
})

const getMoneyReceiveTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ receiver: req.user._id })
    .sort({ createdAt: -1 })
    .populate([
      { path: 'sender', select: 'name image' },
      { path: 'receiver', select: 'name image' },
    ])

  if (transactions) {
    res.status(200).send(transactions)
  } else {
    res.status(400)
    throw new Error('transactions not found')
  }
})

// @desc    deposit money
// @route   POST /api/deposit
// @access  Private
const deposit = asyncHandler(async (req, res) => {
  const { amount } = req.body
  console.log(amount)
  const user = await User.findById(req.user._id)

  if (user) {
    // const transaction = new Transaction({
    //   sender: user._id,
    //   receiver: user._id,
    //   amount: amount,
    //   transactionId: crypto.randomBytes(5).toString('hex'),
    //   type: 'deposit',
    //   reference: 'payment reference',
    //   status: 'success',
    // })

    // await transaction.save()
    await User.findByIdAndUpdate(
      user._id,
      { $inc: { balance: amount } },
      { new: true }
    )
    res.status(200).json({ msg: `$${amount} added to your account` })
  } else {
    res.status(400)
    throw new Error('user not found')
  }
})

module.exports = {
  transferAmount,
  getTransactions,
  verifyReceiver,
  getMoneySendTransactions,
  getMoneyReceiveTransactions,
  deposit,
}
