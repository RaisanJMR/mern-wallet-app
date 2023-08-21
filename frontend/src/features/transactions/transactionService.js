import axios from 'axios'
import { API_URL } from '../constants'
// const API_URL = `${import.meta.env.VITE_URL}/api/`
// const API_URL = 'http://localhost:8080/api/'
console.log('FROM TRANSCTION', API_URL)
const sendMoney = async (transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    API_URL + '/api/transfer',
    transactionData,
    config
  )
  return response.data
}

const getTransactions = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(
    API_URL + '/api/get_transactions/' + userId,
    config
  )
  return response.data
}

const getMoneySend = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + '/api/get_money_send', config)
  return response.data
}

const getMoneyReceive = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + '/api/get_money_receive', config)
  return response.data
}
const addMoney = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    API_URL + '/api/deposit',
    { amount: data.amount },
    config
  )
  return response.data
}

const transactionService = {
  sendMoney,
  getTransactions,
  getMoneySend,
  getMoneyReceive,
  addMoney,
}

export default transactionService
