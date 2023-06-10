import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded'
import ListRoundedIcon from '@mui/icons-material/ListRounded'
import './Navbar.scss'
import Avatar from '../../assets/avatar.png'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { name, image, isAdmin } = useSelector((state) => state.auth.user)
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='search...' />
          <SearchRoundedIcon className='icon' />
        </div>
        <div className='items'>
          {/* <div className='item'>
            <LanguageRoundedIcon className='icon' />
            English
          </div> */}
          {/* <div className='item'>
            <DarkModeRoundedIcon className='icon' />
          </div>
          <div className='item'>
            <FullscreenExitRoundedIcon className='icon' />
          </div>
          <div className='item'>
            <NotificationsRoundedIcon className='icon' />
            <div className='counter'>1</div>
          </div>
          <div className='item'>
            <ChatBubbleRoundedIcon className='icon' />
            <div className='counter'>2</div>
          </div>
          <div className='item'>
            <ListRoundedIcon className='icon' />
          </div> */}
          <div className='item'>
            {image ? (
              <img src={image} alt={name} className='avatar' />
            ) : (
              <img src={Avatar} alt='avatar' className='avatar' />
            )}
          </div>
          <div className='item admin'>
            {name}
            <p>{isAdmin && 'Admin'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
