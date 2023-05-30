import axios from 'axios'
const API_URL = 'http://localhost:8080/api/'

const uploadImage = async (userId, file, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }
  const formData = new FormData()
  formData.append('photo', file)
  console.log(formData)
  const response = await axios.post(
    API_URL + `upload/${userId}`,
    formData,
    config
  )
  response.data
  console.log(response.data)
}

const uploadService = {
  uploadImage,
}

export default uploadService
