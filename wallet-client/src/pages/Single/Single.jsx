import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Chart from '../../components/Chart/Chart'
import './Single.scss'
import List from '../../components/UserList/UserList'

const Single = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <div className='editButton'>Edit</div>
            <h1 className='leftTitle'>Information</h1>
            <div className='item'>
              <img
                src='https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1600'
                alt='user-photo'
                className='itemImage'
              />
              <div className='details'>
                <h1 className='itemTitle'>Jane Doe</h1>
                <div className='detailItem'>
                  <span className='itemKey'>Email:</span>
                  <span className='itemValue'>janedoe@gmail.com</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Phone:</span>
                  <span className='itemValue'>+12 555-555-55</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Address:</span>
                  <span className='itemValue'>89 rue des Chaligny</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Country:</span>
                  <span className='itemValue'>France</span>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <Chart title='User 6 Months (Revenue)' height={200} />
          </div>
        </div>
        <div className='bottom'>
          <h1 className='leftTitle'>Last Transaction</h1>
          <List />
        </div>
      </div>
    </div>
  )
}

export default Single
