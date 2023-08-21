import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Transactions.scss'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useState } from 'react'
import Received from './Received'
import Send from './Send'

const Transactions = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className='transaction'>
      <Sidebar />
      <div className='transactionContainer'>
        <Navbar />
        <div className='transactions'>
          <h1>Transaction history</h1>
          <div className='transactionsList'>
            <Box sx={{ width: '100%' }}>
              <TabContext value={value}>
                <Box sx={{ borderColor: 'divider' }}>
                  <TabList
                  className='tabList'
                    onChange={handleChange}
                    aria-label='send/receive tabs'>
                    <Tab label='Send' className='singleTab' value='1' />
                    <Tab label='Received' className='singleTab' value='2' />
                  </TabList>
                </Box>
                <TabPanel value='1'>
                  <Send />
                </TabPanel>
                <TabPanel value='2'>
                  <Received />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions
