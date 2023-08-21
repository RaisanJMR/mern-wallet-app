import { Link } from 'react-router-dom'
import './Sidebar.scss'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import { logout, reset } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAdmin } = useSelector((state) => state.auth.user)
  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className='sidebar'>
      <div className='top'>
        <div className='top'>
          <Link to='/' style={{ textDecoration: 'none', color: '#222222' }}>
            <span className='logo'>EasyPay</span>
          </Link>
        </div>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <Link to='/home' style={{ textDecoration: 'none' }}>
            <li>
              <DashboardRoundedIcon className='icon' />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className='title'>LIST</p>
          {isAdmin && (
            <Link to='/users' style={{ textDecoration: 'none' }}>
              <li>
                <PeopleRoundedIcon className='icon' />
                <span>Users</span>
              </li>
            </Link>
          )}
          <Link to='/transactions' style={{ textDecoration: 'none' }}>
            <li>
              <CompareArrowsRoundedIcon className='icon' />
              <span>Transactions</span>
            </li>
          </Link>
          <Link to='/requests' style={{ textDecoration: 'none' }}>
            <li>
              <AttachMoneyRoundedIcon className='icon' />
              <span>Requests</span>
            </li>
          </Link>
          <p className='title'>USER</p>
          <Link to='/profile' style={{ textDecoration: 'none' }}>
            <li>
              <AccountBoxRoundedIcon className='icon' />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <LogoutRoundedIcon className='icon' />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
