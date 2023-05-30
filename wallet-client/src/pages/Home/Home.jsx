import React from 'react'
import { Navigate } from 'react-router-dom'
import './Home.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Widget from '../../components/Widget/Widget'
import Featured from '../../components/Featured/Featured'
import Chart from '../../components/Chart/Chart'
import List from '../../components/Table/Table'

const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='widgets'>
          <Widget type='user' />
          <Widget type='order' />
          <Widget type='earning' />
          <Widget type='balance' />
        </div>
        <div className='charts'>
          <Featured />
          <Chart title='Last 6 Months (Revenue)' height={320} />
        </div>
        <div className='listContainer'>
          <div className='listTitle'>send or request from</div>
          <List />
        </div>
      </div>
    </div>
  )
}

export default Home
