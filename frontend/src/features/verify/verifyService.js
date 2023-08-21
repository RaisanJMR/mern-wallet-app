import axios from 'axios'
import { API_URL } from '../constants'
// const API_URL = `${import.meta.env.VITE_URL}/api/`
// const API_URL = 'http://localhost:8080/api/'
console.log('FROM VERIFY', API_URL)
const verifyUser = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + `/api/users/verify/${data._id}`,
    { isVerified: data.isVerified },
    config
  )
  return response.data
}

const verifyService = {
  verifyUser,
}

export default verifyService
