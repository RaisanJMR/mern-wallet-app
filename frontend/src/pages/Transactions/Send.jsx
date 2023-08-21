import { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSendTransactions,
  reset,
} from '../../features/transactions/transactionSlice'
import './Transactions.scss'
import Loader from '../../components/Loader/Loader'
import { optionsDate, optionsTime, USDollar } from '../utils/helpOptions'

const Send = () => {
  const dispatch = useDispatch()

  const { send, isLoading } = useSelector((state) => state.transact)

  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getSendTransactions())
  }, [dispatch])

  if (isLoading) {
    return <Loader />
  }

  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='tableCell tableHead'>Send To</TableCell>
            <TableCell className='tableCell tableHead'>Date</TableCell>
            <TableCell className='tableCell tableHead'>
              Transaction Id
            </TableCell>
            <TableCell className='tableCell tableHead'>
              Transaction Type
            </TableCell>
            <TableCell className='tableCell tableHead'>Amount</TableCell>
            <TableCell className='tableCell tableHead'>Reference</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {send.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img
                    src={transaction.receiver.image}
                    alt={transaction.receiver.name}
                    className='image'
                  />
                  {transaction.receiver.name}
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
                {transaction.transactionId}
              </TableCell>
              <TableCell className='tableCell'>
                <span
                  className={`${
                    transaction.transactionType === 'deposit' && 'deposit'
                  }
                        ${
                          transaction.transactionType === 'transfer' &&
                          'transfer'
                        }
                        ${
                          transaction.transactionType === 'payment' && 'payment'
                        }
                        ${
                          transaction.transactionType === 'refund' && 'refund'
                        }`}>
                  {transaction.transactionType}
                </span>
              </TableCell>

              <TableCell className='tableCell'>
                {USDollar.format(transaction.amount)}
              </TableCell>
              <TableCell className='tableCell'>
                {transaction.reference}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Send
