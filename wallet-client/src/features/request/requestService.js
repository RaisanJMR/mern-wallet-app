import axios from 'axios'
const API_URL = 'http://localhost:8080/api/'

const requestMoney = async (requestData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + 'request', requestData, config)
  return response.data
}

const requestSend = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'request-send', config)
  return response.data
}

const requestReceived = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'request-received', config)
  return response.data
}

const updateRequestStatus = async (updatedRequest, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    API_URL + 'update-request-status',
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
