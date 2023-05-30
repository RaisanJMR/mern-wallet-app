import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './style/dark.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import List from './pages/List/List'
import Single from './pages/Single/Single'
import New from './pages/New/New'
import Transactions from './pages/Transactions/Transactions'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { userInputs, productInputs } from './formSource'
import { useContext } from 'react'
import Landing from './pages/Landing/Landing'
import ProtectedRoutes from './ProtectedRoutes'
import { UserContext } from './context/userContext'
import Register from './pages/Register/Register'
import Request from './pages/Request/Request'
import Profile from './pages/Profile/Profile'

function App() {
  // const { user } = useContext(UserContext)
  const { user } = useSelector((state) => state.auth)
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' />
          <Route index element={<Landing />} />

          <Route element={<ProtectedRoutes user={user} />}>
            <Route path='home' element={<Home />} />
          </Route>

          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route path='users' element={<ProtectedRoutes user={user} />}>
            <Route index element={<List />} />
            <Route path=':userId' element={<Single />} />
            <Route
              path='new'
              element={<New inputs={userInputs} title='Add new user' />}
            />
          </Route>

          <Route path='transactions' element={<ProtectedRoutes user={user} />}>
            <Route index element={<Transactions />} />
          </Route>

          <Route path='requests' element={<ProtectedRoutes user={user} />}>
            <Route index element={<Request />} />
          </Route>

          <Route path='profile' element={<ProtectedRoutes user={user} />}>
            <Route index element={<Profile />} />
          </Route>

          <Route path='products' element={<ProtectedRoutes user={user} />}>
            <Route index element={<List />} />
            <Route path=':productId' element={<Single />} />
            <Route
              path='new'
              element={<New inputs={productInputs} title='Add new product' />}
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
