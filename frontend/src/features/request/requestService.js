import axios from 'axios'
import { API_URL } from '../constants'

// const API_URL = `${import.meta.env.VITE_URL}/api/`
// const API_URL = 'http://localhost:8080/api/'

console.log('FROM REQUEST', API_URL)
const requestMoney = async (requestData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + '/api/request', requestData, config)
  return response.data
}

const requestSend = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + '/api/request-send', config)
  return response.data
}

const requestReceived = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + '/api/request-received', config)
  return response.data
}

const updateRequestStatus = async (updatedRequest, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    API_URL + '/api/update-request-status',
    updatedRequest,
    config
  )
  return response.data
}

const requestService = {
  requestMoney,
  requestSend,
  requestReceived,
  updateRequestStatus,
}

export default requestService
