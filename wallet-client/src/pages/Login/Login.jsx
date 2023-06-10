import './Login.scss'
import Spinner from '../../components/Spinner/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { login, reset } from '../../features/auth/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  useEffect(() => {
    if (isError) {
      alert(message)
    }
    if (isSuccess || user) {
      navigate('/home')
    }
    dispatch(reset())
  }, [dispatch, navigate, isError, isSuccess, user, message])

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__header'>
          <h1>Hello Again</h1>
          <p>Welcome Back! you have been missed</p>
        </div>
        <section className='login__form'>
          <form onSubmit={onSubmit}>
            <div className='form__control'>
              <input
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={onChange}
                placeholder='please enter email'
                required
              />
            </div>
            <div className='form__control'>
              <input
                type='password'
                name='password'
                id='password'
                value={password}
                onChange={onChange}
                placeholder='please enter password'
                required
              />
            </div>
            <button className='btn'>login</button>
            <p className='small__text'>
              Not registered yet?<Link to='/register'> Create an account</Link>{' '}
            </p>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Login
