const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://raisan:raisan123@cluster0.dclozxw.mongodb.net/wallet-app")

    console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen.black.bold.underline)
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.bold.underline)
    process.exit(1)
  }
}

module.exports = connectDB
