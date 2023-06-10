import axios from 'axios'
const API_URL = 'http://localhost:8080/api/'

const uploadImage = async (data) => {

  const response = await axios.post(API_URL + `upload/${data.id}`, {
    photo: data.photo,
  })
  return response.data
}

const uploadService = {
  uploadImage,
}

export default uploadService
