import axios from 'axios'
const API_URL = 'http://localhost:8080/api/'

const uploadImage = async (data, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }
  // console.log('inside service', id, photo)
  // const api = API_URL + `upload/${data.id}`
  // console.log(api)
  const response = await axios.post(API_URL + `upload/${data.id}`, {
    photo: data.photo,
  })
  return response.data
}

const uploadService = {
  uploadImage,
}

export default uploadService
