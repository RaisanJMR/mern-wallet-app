import './Landing.scss'
import { Routes, Route, Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='landing'>
      <h1>Landing</h1>
      <p>Landing (Public: anyone can access this page)</p>
      <Navigation />
    </div>
  )
}
const Navigation = () => (
  <nav className='navigation'>
    <Link to='/login'>Login</Link>
    <Link to='/home'>Home</Link>
    <Link to='/dashboard'>Dashboard</Link>
    <Link to='/analytics'>Analytics</Link>
    <Link to='/admin'>Admin</Link>
  </nav>
)
export default Landing
