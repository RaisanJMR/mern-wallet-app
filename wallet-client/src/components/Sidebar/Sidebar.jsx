import { Link } from 'react-router-dom'
import './Sidebar.scss'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded'
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded'
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded'
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded'
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded'
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded'
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { logout, reset } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  // const { dispatch } = useContext(UserContext)
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
            <span className='logo'>wallet</span>
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
          <Link to='/products' style={{ textDecoration: 'none' }}>
            <li>
              <CategoryRoundedIcon className='icon' />
              <span>Products</span>
            </li>
          </Link>
          <p className='title'>USEFUL</p>
          <li>
            <CircleNotificationsRoundedIcon className='icon' />
            <span>Notifications</span>
          </li>
          <p className='title'>SERVICE</p>
          <li>
            <QueryStatsRoundedIcon className='icon' />
            <span>Stats</span>
          </li>
          <li>
            <MonitorHeartRoundedIcon className='icon' />
            <span>System Health</span>
          </li>
          <li>
            <ChecklistRoundedIcon className='icon' />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsRoundedIcon className='icon' />
            <span>Settings</span>
          </li>
          <p className='title'>USER</p>
          <Link to='/profile' style={{ textDecoration: 'none' }}>
            <li>
              <AccountBoxRoundedIcon className='icon' />
              <span>Profile</span>
            </li>
          </Link>
          {/* <li onClick={() => dispatch({ type: 'LOGOUT' })}> */}
          <li onClick={handleLogout}>
            <LogoutRoundedIcon className='icon' />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className='bottom'>
        <div className='colorOption'></div>
        <div className='colorOption'></div>
        <div className='colorOption'></div>
      </div>
    </div>
  )
}

export default Sidebar
