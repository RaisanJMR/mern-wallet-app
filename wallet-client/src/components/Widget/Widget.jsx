import {
  AccountBalanceWalletRounded,
  MonetizationOnRounded,
} from '@mui/icons-material'
import './Widget.scss'
import AssignmentReturnedRoundedIcon from '@mui/icons-material/AssignmentReturnedRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Widget = ({ type }) => {
  const { balance } = useSelector((state) => state.auth.user)
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
  let data
  const amount = 1000
  const diff = 20
  switch (type) {
    case 'user':
      data = {
        title: 'TRANSACTIONS',
        isMoney: false,
        link: "/transactions",
        linkText: 'See all transactions',
        icon: (
          <CompareArrowsRoundedIcon
            className='icon'
            style={{ color: 'crimson', backgroundColor: 'rgba(255,0,0,0.2)' }}
          />
        ),
      }
      break
    case 'order':
      data = {
        title: 'REQUESTS',
        isMoney: false,
        link: "/requests",
        linkText: 'View all requests',
        icon: (
          <AssignmentReturnedRoundedIcon
            className='icon'
            style={{
              color: 'goldenrod',
              backgroundColor: 'rgba(218,165,32,0.2)',
            }}
          />
        ),
      }
      break
    case 'earning':
      data = {
        title: 'MONEY SEND',
        isMoney: true,
        link: "/latest",
        linkText: 'latest send transaction',
        icon: (
          <MonetizationOnRounded
            className='icon'
            style={{ color: 'green', backgroundColor: 'rgba(0,128,0,0.2)' }}
          />
        ),
      }
      break
    case 'balance':
      data = {
        title: 'BALANCE',
        isMoney: true,
        link: "/balance",
        isBalance: true,
        linkText: 'See details',
        icon: (
          <AccountBalanceWalletRounded
            className='icon'
            style={{ color: 'purple', backgroundColor: 'rgba(128,0,128,0.2)' }}
          />
        ),
      }
      break

    default:
      break
  }
  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
        <span className='counter'>
          {/* {data.isMoney && '$'} */}
          {data.isBalance ? USDollar.format(balance) : amount}
        </span>
        <Link to={data.link} className='link'>
          <span>{data.linkText}</span>
        </Link>
      </div>
      <div className='right'>
        <div className='percentage positive'>
          <KeyboardArrowUpRoundedIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget
