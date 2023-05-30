const dotenv = require('dotenv').config()
const path = require('path')
const express = require('express')
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorHandler')
const cloudinary = require('./utils/cloudinary')
const Media = require('./models/mediaModal')
const fileUpload = require('express-fileupload')
const userModal = require('./models/userModal')

connectDB()

const app = express()
// Enable CORS
app.use(
  fileUpload({
    useTempFiles: true,
  })
)
app.use(cors())
app.options('*', cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/', require('./routes/transactionRoutes'))
app.use('/api/', require('./routes/requestRoutes'))
// app.use('/api/', require('./routes/uploadRoutes'))

app.post('/api/upload/:id', async (req, res) => {

  
  const file = req.files.data
  console.log(file)
  // if (
  //   file.mimetype == 'image/jpeg' ||
  //   file.mimetype == 'image/jpg' ||
  //   file.mimetype == 'image/png'
  // ) {
  //   try {
  //     const uploadResponse = await cloudinary.uploader.upload(
  //       file.tempFilePath,
  //       {
  //         folder: 'profile',
  //         upload_preset: 'my_media',
  //         use_filename: true,
  //       }
  //     )
  //     const { secure_url } = uploadResponse
  //     const newUser = await userModal.findByIdAndUpdate(req.params.id, {
  //       image: secure_url,
  //     })
  //     newUser.image = secure_url
  //     res.status(201).json(newUser)
  //   } catch (error) {

  //     res.status(500)
  //     throw new Error(error)
  //   }
  // } else {
  //   return res.status(400).json({
  //     msg: 'only supports .jpg/.jpeg and .png',
  //   })
  // }

})

app.get('/', (req, res) => {
  res.send('api is running...')
})

app.use(errorHandler)

app.listen(PORT, () =>
  console.log(
    `Server Running on Port: http://localhost:${PORT} at ${new Date().toLocaleString(
      'en-US'
    )}`.bgCyan.bold.underline
  )
)
