import React from 'react'
import './Loader.scss'
import { CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <div className='circularProgressContainer'>
      <CircularProgress />
    </div>
  )
}

export default Loader
