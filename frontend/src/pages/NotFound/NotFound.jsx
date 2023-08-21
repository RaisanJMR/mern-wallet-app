import React from 'react'
import './NotFound.scss'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='notFound'>
      <h1>404 - Not Found</h1>
      <p>The requested page could not be found.</p>
      <Link to='/home' className='notFoundLink'>
        <p>go to home</p>
      </Link>
    </div>
  )
}
export default NotFound
