const asyncHandler = require('express-async-handler')
const { cloudinary } = require('../utils/cloudinary')
const User = require('../models/userModal')


const uploadImage = asyncHandler(async (req, res) => {
  const file = req.files.photo
  if (
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/png'
  ) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          folder: 'profile',
          upload_preset: 'my_media',
          use_filename: true,
        }
      )
      res.json({ data: uploadResponse })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ err: error })
    }
  } else {
    return res.status(400).json({
      msg: 'only supports .jpg/.jpeg and .png',
    })
  }
})

module.exports = uploadImage
