import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useSelector, useDispatch } from 'react-redux'
import { getusers, reset } from '../../features/auth/authSlice'
import './UserList.scss'
import { useEffect, useState } from 'react'
import SendModal from '../Modal/SendModal'
import RequestModal from '../Modal/RequestModal'
import Avatar from '../../assets/avatar.png'
import Loader from '../Loader/Loader'

const List = () => {
  const [sendModal, setSendModal] = useState(false)
  const [receiverId, setReceiverId] = useState('')
  const [requestModal, setRequestModal] = useState(false)
  const [requestTo, setRequestTo] = useState('')
  const dispatch = useDispatch()

  const { users, isSuccess, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getusers())
  }, [dispatch])

  const handleSendModal = (userId) => {
    setReceiverId(userId)
    setRequestModal(false)
    setSendModal(true)
  }

  const handleRequestModal = (userId) => {
    setRequestTo(userId)
    setSendModal(false)
    setRequestModal(true)
  }

  return (
    <>
      {sendModal && (
        <SendModal receiverId={receiverId} setSendModalOpen={setSendModal} />
      )}
      {requestModal && (
        <RequestModal
          requestTo={requestTo}
          setRequestModalOpen={setRequestModal}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper} className='table'>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell className='tableCell tableHead'>Acc No:</TableCell>
                <TableCell className='tableCell tableHead'>Name</TableCell>
                <TableCell className='tableCell tableHead'>Email</TableCell>
                <TableCell className='tableCell tableHead'>Phone</TableCell>
                <TableCell className='tableCell tableHead'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className='tableCell'>{user._id}</TableCell>
                  <TableCell className='tableCell'>
                    <div className='cellWrapper'>
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className='image'
                        />
                      ) : (
                        <img src={Avatar} alt={user.name} className='image' />
                      )}
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell className='tableCell'>{user.email}</TableCell>
                  <TableCell className='tableCell'>{user.phone}</TableCell>
                  <TableCell className='tableCell'>
                    <span
                      className='send'
                      onClick={() => handleSendModal(user._id)}>
                      send
                    </span>

                    <span
                      className='req'
                      onClick={() => handleRequestModal(user._id)}>
                      request
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
export default List
