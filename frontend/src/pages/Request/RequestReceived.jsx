import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import './Request.scss'
import {
  reset,
  requestReceive,
  updateRequest,
  payReset,
} from '../../features/request/requestSlice'
import Loader from '../../components/Loader/Loader'

import { optionsDate, optionsTime, USDollar } from '../utils/helpOptions'

const RequestReceived = () => {
  const dispatch = useDispatch()

  const { received, isLoading, reqSuccess } = useSelector(
    (state) => state.request
  )

  useEffect(() => {
    dispatch(requestReceive())
    if (reqSuccess) {
      dispatch(payReset())
    }
  }, [dispatch, reqSuccess])

  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  const handleClick = (transaction) => {
    const newRequest = {
      _id: transaction._id,
      sender: transaction.receiver._id,
      receiver: transaction.sender._id,
      amount: transaction.amount,
      transactionType: 'deposit',
      reference: 'payment reference',
      status: 'accepted',
    }
    dispatch(updateRequest(newRequest))
  }

  if (isLoading || reqSuccess) {
    return <Loader />
  }

  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='tableCell tableHead'>Request from</TableCell>
            <TableCell className='tableCell tableHead'>Received At</TableCell>
            <TableCell className='tableCell tableHead'>Status</TableCell>
            <TableCell className='tableCell tableHead'>Amount</TableCell>
            <TableCell className='tableCell tableHead'>Description</TableCell>
            <TableCell className='tableCell tableHead'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {received.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img
                    src={transaction.sender.image}
                    alt={transaction.sender.name}
                    className='image'
                  />
                  {transaction.sender.name}
                </div>
              </TableCell>
              <TableCell className='tableCell date'>
                {new Date(transaction.createdAt).toLocaleString(
                  'en-US',
                  optionsDate
                )}
                <div className='time'>
                  at{' '}
                  {new Date(transaction.createdAt).toLocaleString(
                    'en-US',
                    optionsTime
                  )}
                </div>
              </TableCell>
              <TableCell className='tableCell'>
                <span
                  className={`${transaction.status === 'pending' && 'pending'}
        ${transaction.status === 'accepted' && 'accepted'}
        ${transaction.status === 'cancel' && 'cancel'}`}>
                  {transaction.status}
                </span>
              </TableCell>
              <TableCell className='tableCell'>
                {USDollar.format(transaction.amount)}
              </TableCell>
              <TableCell className='tableCell'>
                {transaction.description}
              </TableCell>
              <TableCell className='tableCell'>
                {transaction.status === 'pending' ? (
                  <button
                    className='accept'
                    onClick={() => handleClick(transaction)}>
                    Accept and pay
                  </button>
                ) : (
                  <button className='paid' disabled>
                    Paid
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RequestReceived
