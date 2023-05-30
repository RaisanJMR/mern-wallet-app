const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    transactionType: {
      type: String,
      required: true,
      default: 'payment',
      enum: ['payment', 'transfer', 'deposit', 'refund'],
    },
    transactionId: {
      type: String,
    },
    reference: {
      type: String,
      required: true,
      enum: ['transaction ID', 'payment reference'],
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model('Transaction', transactionSchema)
