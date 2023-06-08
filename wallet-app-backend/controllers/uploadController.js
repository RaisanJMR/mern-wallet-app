const asyncHandler = require('express-async-handler')
const cloudinary = require('../utils/cloudinary')
const User = require('../models/userModal')

const uploadImage = asyncHandler(async (req, res) => {
  const { photo } = req.body
  try {
    const uploadedImage = await cloudinary.uploader.upload(
      photo,
      { folder: 'profile', upload_preset: 'my_media', use_filename: true },
      function (error, result) {
        if (error) {
          console.log(error)
        }
        console.log(result)
      }
    )
    const { secure_url } = uploadedImage

    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        image: secure_url,
      },
      { new: true }
    )

    // newUser.image = secure_url
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500)
    throw new Error(error)
  }
})

module.exports = uploadImage
