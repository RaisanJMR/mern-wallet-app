import React from 'react'
import './Loader.scss'
import { CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <div className='circularProgressContainer'>
      <CircularProgress className='progressLoader' />
    </div>
  )
}

export default Loader
