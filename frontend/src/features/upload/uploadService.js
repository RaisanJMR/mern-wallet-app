import axios from 'axios'
import { API_URL } from '../constants'
// const API_URL = `${import.meta.env.VITE_URL}/api/`
// const API_URL = 'http://localhost:8080/api/'
console.log('FROM UPLOAD', API_URL)
const uploadImage = async (data) => {
  const response = await axios.post(API_URL + `/api/upload/${data.id}`, {
    photo: data.photo,
  })
  return response.data
}
const getUploadImage = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + '/api/users/get_image', config)
  return response.data
}

const uploadService = {
  uploadImage,
  getUploadImage,
}

export default uploadService
