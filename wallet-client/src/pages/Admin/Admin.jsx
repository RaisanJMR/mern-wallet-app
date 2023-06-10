import { useEffect } from 'react'
import './Admin.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { TableContainer, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getusers } from '../../features/auth/authSlice'
import { verify, verifyReset } from '../../features/verify/verifySlice'
import Loader from '../../components/Loader/Loader'


const Admin = () => {
  const dispatch = useDispatch()
  const { users, isLoading } = useSelector((state) => state.auth)
  const { verifySuccess } = useSelector((state) => state.verify)

  useEffect(() => {
    dispatch(getusers())
    if (verifySuccess) {
      dispatch(verifyReset())
    }
  }, [dispatch, verifySuccess])

  const handleVerify = (user) => {
    const verifiedUser = {
      _id: user._id,
      isVerified: true,
    }
    dispatch(verify(verifiedUser))
  }

  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        <div className='usersList'>
          <h1>users </h1>
          <div className='usersListContainer'>
            {isLoading ? (
              <Loader />
            ) : (
              <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell className='tableCell tableHead'>
                        Acc No:
                      </TableCell>
                      <TableCell className='tableCell tableHead'>
                        Name
                      </TableCell>
                      <TableCell className='tableCell tableHead'>
                        Email
                      </TableCell>
                      <TableCell className='tableCell tableHead'>
                        Phone
                      </TableCell>

                      <TableCell className='tableCell tableHead'>
                        status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className='tableCell'>{user._id}</TableCell>
                        <TableCell className='tableCell'>
                          <div className='cellWrapper'>
                            <img
                              src={user.image}
                              alt={user.name}
                              className='image'
                            />
                            {user.name}
                          </div>
                        </TableCell>
                        <TableCell className='tableCell'>
                          {user.email}
                        </TableCell>
                        <TableCell className='tableCell'>
                          {user.phone}
                        </TableCell>
                        <TableCell className='tableCell'>
                          {user.isVerified ? (
                            <button disabled>verified</button>
                          ) : (
                            <button
                              className='verifyBtn'
                              onClick={() => handleVerify(user)}>
                              verify
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
