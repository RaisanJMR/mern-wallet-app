import React from 'react'
import '../Modal/SendModal.scss'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useSelector, useDispatch } from 'react-redux'
import { addBalance, reset } from '../../features/transactions/transactionSlice'
import Loader from '../Loader/Loader'

const AddMoneyModal = ({ setAddMoneyModal }) => {
  const dispatch = useDispatch()
  const { isSuccess, isLoading, moneyAdded, isError, message } = useSelector(
    (state) => state.transact
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success(moneyAdded.msg)
      setAddMoneyModal(false)
    }
    dispatch(reset())
  }, [isError, message, isSuccess])

  const addMoneyClose = () => {
    setAddMoneyModal(false)
  }

  const [formData, setFormData] = useState({
    amount: '',
  })
  
  const { amount } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      amount,
    }
    dispatch(addBalance(data))
  }

  return (
    <div className='sendmodal'>
      <div className='sendModalContainer'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className='sendModalHeader'>
              <h1>Add Money</h1>
              <div className='closeIconContainer' onClick={addMoneyClose}>
                <CloseRoundedIcon className='closeIcon' />
              </div>
            </div>
            <div className='sendModalContent'>
              <section className='sendForm'>
                <form onSubmit={onSubmit}>
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
                  <button className='btn' type='submit'>
                    Add
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

export default AddMoneyModal
