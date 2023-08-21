import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import RequestSend from './RequestSend'
import RequestReceived from './RequestReceived'
import { useState } from 'react'
import './Request.scss'

const Request = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className='request'>
      <Sidebar />
      <div className='requestContainer'>
        <Navbar />
        <div className='requests'>
          <h1>Fund requests</h1>
          <div className='requestsList'>
            <Box sx={{ width: '100%' }}>
              <TabContext value={value}>
                <Box sx={{ borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label='send/receive tabs'>
                    <Tab label='Send' value='1' className='singleTab' />
                    <Tab label='Received' value='2' className='singleTab' />
                  </TabList>
                </Box>
                <TabPanel value='1'>
                  <RequestSend />
                </TabPanel>
                <TabPanel value='2'>
                  <RequestReceived />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Request
