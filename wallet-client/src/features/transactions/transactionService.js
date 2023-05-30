import axios from 'axios'
const API_URL = 'http://localhost:8080/api/'

const sendMoney = async (transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    API_URL + 'transfer',
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
    API_URL + 'get_transactions/' + userId,
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
  const response = await axios.get(API_URL + 'get_money_send', config)
  return response.data
}

const getMoneyReceive = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'get_money_receive', config)
  console.log(response.data)
  return response.data
}

const transactionService = {
  sendMoney,
  getTransactions,
  getMoneySend,
  getMoneyReceive
}

export default transactionService
