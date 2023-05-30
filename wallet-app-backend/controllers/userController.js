const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../models/userModal')

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    address,
    identificationType,
    identificationNumber,
    isAdmin,
    isVerified,
    balance,
  } = req.body
  // console.log(req.body)
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !address ||
    !identificationType ||
    !identificationNumber
  ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    balance,
    password: hashedPassword,
    phone,
    address,
    identificationType,
    identificationNumber,
    isAdmin: false,
    isVerified: true,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      balance: user.balance,
      email: user.email,
      phone: user.phone,
      address: user.address,
      identificationType: user.identificationType,
      identificationNumber: user.identificationNumber,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token: generateToken(user._id),
    })
  } else {
    // 400 Bad Request

    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    login user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    var userObj = user.toObject()
    delete userObj.password
    res.status(200).json({ ...userObj, token: generateToken(user._id) })
  } else {
    // 401 Unauthorized
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc    get current user
// @route   GET /api/users/curent_user
// @access  Protect
const currentUser = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  }
  res.status(200).json(user)
})

// @desc    get all users
// @route   GET /api/users/get_users
// @access  Protect
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()

  let newUsers = users.filter((user) => {
    return user._id.toString() !== req.user._id.toString()
  })

  if (newUsers) {
    res.status(200).json(newUsers)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    verify user
// @route   GET /api/users/verify/:id
// @access  Protect
const verify = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    isVerified: req.body.isVerified,
  })
  if (user) {
    res
      .status(201)
      .json({ _id: user._id, name: user.name, isVerified: user.isVerified })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  register,
  login,
  currentUser,
  getUsers,
  verify,
}
