import axios from 'axios'
const API_URL = 'http://localhost:8080/api/'

const verifyUser = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + `users/verify/${data._id}`,
    { isVerified: data.isVerified },
    config
  )
  return response.data
}

const verifyService = {
  verifyUser,
}

export default verifyService
