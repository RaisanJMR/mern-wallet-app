import './SendModal.scss'
import { toast } from 'react-toastify'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendMoney, reset } from '../../features/transactions/transactionSlice'
import Loader from '../Loader/Loader'

const SendModal = ({ setSendModalOpen, receiverId }) => {
  const dispatch = useDispatch()
  const { _id } = useSelector((state) => state.auth.user)
  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.transact
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('money send successfully')
      setSendModalOpen(false)
    }
    dispatch(reset())
  }, [isError, message, isSuccess])

  const [formData, setFormData] = useState({
    sender: _id,
    receiver: receiverId,
    amount: '',
    transactionType: '',
    reference: '',
  })

  const { sender, receiver, amount, transactionType, reference } = formData
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const transactionData = {
      sender,
      receiver,
      amount,
      transactionType,
      reference,
    }
    dispatch(sendMoney(transactionData))
  }

  const sendModalClose = () => {
    setSendModalOpen(false)
  }

  return (
    <div className='sendmodal'>
      <div className='sendModalContainer'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className='sendModalHeader'>
              <h1>Send Money</h1>
              <div className='closeIconContainer' onClick={sendModalClose}>
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
                      value={sender}
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
                      value={receiver}
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
                      value={amount}
                      onChange={onChange}
                      min='1'
                      max='100000'
                      placeholder='$1000'
                      required
                    />
                  </div>
                  <div className='formControl'>
                    <label htmlFor='transactionType'>Transaction Type</label>
                    <select
                      name='transactionType'
                      id='transactionType'
                      value={transactionType}
                      onChange={onChange}>
                      <option value='payment'>payment</option>
                      <option value='transfer'>transfer</option>
                      <option value='deposit'>deposit</option>
                      <option value='refund'>refund</option>
                    </select>
                  </div>
                  <div className='formControl'>
                    <label htmlFor='reference'>Reference</label>
                    <select
                      name='reference'
                      id='reference'
                      value={reference}
                      onChange={onChange}>
                      <option value='transaction ID'>transaction ID</option>
                      <option value='payment reference'>
                        payment reference
                      </option>
                    </select>
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

export default SendModal
