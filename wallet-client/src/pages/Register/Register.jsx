import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../../features/auth/authSlice'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    identificationType: '',
  })

  const { name, email, password, phone, address, identificationType } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      alert(message)
    }
    if (isSuccess || user) {
      navigate('/home')
    }
    dispatch(reset())
  }, [dispatch, navigate, isError, isSuccess, user, message])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      password,
      phone,
      address,
      identificationType,
    }
    dispatch(register(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__header'>
          <h1>create an account</h1>
          <p>Get started with our platform by creating your account.</p>
        </div>
        <section className='login__form'>
          <form onSubmit={onSubmit}>
            <div className='form__control'>
              <input
                type='text'
                name='name'
                id='name'
                value={name}
                onChange={onChange}
                placeholder='please enter name'
                required
              />
            </div>
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
                type='text'
                name='phone'
                id='phone'
                value={phone}
                onChange={onChange}
                placeholder='please enter phone'
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
            <div className='form__control'>
              <select
                name='identificationType'
                id='identificationType'
                value={identificationType}
                onChange={onChange}>
                <option value='driver license'>driver license</option>
                <option value='passport'>passport</option>
                <option value='national ID'>national ID</option>
              </select>
            </div>
            <div className='form__control'>
              <input
                type='text'
                name='address'
                id='address'
                value={address}
                onChange={onChange}
                placeholder='type address'
                required
              />
            </div>
            <button className='btn' type='submit'>
              Register
            </button>
            <p className='small__text'>
              Have an account!<Link to='/login'> Login</Link>{' '}
            </p>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Register
