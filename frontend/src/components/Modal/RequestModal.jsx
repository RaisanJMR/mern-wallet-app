import './SendModal.scss'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { sendRequest, reset } from '../../features/request/requestSlice'
import Loader from '../Loader/Loader'

const RequestModal = ({ setRequestModalOpen, requestTo }) => {
  const dispatch = useDispatch()

  const { _id } = useSelector((state) => state.auth.user)
  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.request
  )

  const requestModalClose = () => {
    setRequestModalOpen(false)
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('request send successfully')
      setRequestModalOpen(false)
    }
    dispatch(reset())
  }, [isError, message, isSuccess])

  const [formData, setFormData] = useState({
    receiver: requestTo,
    amount: '',
    description: '',
  })

  const { receiver, amount, description } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const transactionData = {
      receiver,
      amount,
      description,
    }
    dispatch(sendRequest(transactionData))
  }

  return (
    <div className='sendmodal'>
      <div className='sendModalContainer'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className='sendModalHeader'>
              <h1>Request Fund</h1>
              <div className='closeIconContainer' onClick={requestModalClose}>
                <CloseRoundedIcon className='closeIcon' />
              </div>
            </div>
            <div className='sendModalContent'>
              <section className='sendForm'>
                <form onSubmit={onSubmit}>
                  <div className='formControl'>
                    <label htmlFor='senderId'>Sender acc no</label>
                    <input
                      type='text'
                      name='senderId'
                      id='senderId'
                      value={_id}
                      onChange={onChange}
                      placeholder='6258457d541d78c4fd14'
                      required
                    />
                  </div>
                  <div className='formControl'>
                    <label htmlFor='receiverId'>Receiver acc no</label>
                    <input
                      type='text'
                      name='receiverId'
                      id='receiverId'
                      value={requestTo}
                      onChange={onChange}
                      placeholder='6258457d541d7148c4fd14'
                      required
                    />
                  </div>
                  <div className='formControl'>
                    <label htmlFor='amount'>Amount</label>
                    <input
                      type='number'
                      name='amount'
                      id='amount'
                      min='1'
                      max='100000'
                      value={amount}
                      onChange={onChange}
                      placeholder='$1000'
                      required
                    />
                  </div>
                  <div className='formControl'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                      name='description'
                      id='description'
                      cols='50'
                      value={description}
                      onChange={onChange}
                      rows='3'
                      maxLength={20}
                      required></textarea>
                  </div>
                  <button className='btn' type='submit'>
                    Send
                  </button>
                </form>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RequestModal
