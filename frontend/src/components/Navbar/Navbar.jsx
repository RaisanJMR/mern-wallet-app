import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
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
