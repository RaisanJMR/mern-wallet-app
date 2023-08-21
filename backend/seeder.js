const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const fs = require('fs')
const path = require('path')
const colors = require('colors')
// const User = require('./models/userModal')
const User = require('./models/userModal')
const Request = require('./models/requestModal')
const Transaction = require('./models/transactionModal')

const connectDB = require('./config/db')

connectDB()

// READ JSON FILES

const users = JSON.parse(
  fs.readFileSync(`${path.resolve()}/data/users.json`, 'utf-8')
)
console.log(path.resolve())
const importData = async () => {
  try {
    await User.deleteMany()
    await User.insertMany(users)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Request.deleteMany()
    await Transaction.deleteMany()
    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
