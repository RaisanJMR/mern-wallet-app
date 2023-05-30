import axios from 'axios'
// const API_URL = 'https://wallet-app-bty8.onrender.com/api/users/'
const API_URL = 'http://localhost:8080/api/users/'

// LOGIN
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  // console.log(response)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// REGISTER
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}
// GET ALL USER
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'get_users',config)
  return response.data
}

const logout = () => localStorage.removeItem('user')

const authService = {
  login,
  logout,
  register,
  getAllUsers,
}

export default authService