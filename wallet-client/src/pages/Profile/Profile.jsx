import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Profile.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
  uploadProfileImage,
} from '../../features/upload/uploadSlice'
import Loader from '../../components/Loader/Loader'

const Profile = () => {
  const dispatch = useDispatch()

  const { name, _id, image } = useSelector((state) => state.auth.user)
  const { uploadLoading, uploadSuccess } = useSelector((state) => state.upload)
  const [file, setFile] = useState('')
  const [photo, setPhoto] = useState('')

  const previewFiles = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setPhoto(reader.result)
    }
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
    previewFiles(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      id: _id,
      photo: photo,
    }
    dispatch(uploadProfileImage(data))
  }

  return (
    <div className='profile'>
      <Sidebar />
      <div className='profileContainer'>
        <Navbar />
        <div className='userProfile'>
          <div className='profilePhoto'>
            {uploadLoading ? (
              <Loader />
            ) : (
              <>
                <h1>{name}</h1>
                {photo ? (
                  <img src={photo} alt='photo' className='profileImage' />
                ) : image ? (
                  <img src={image} alt='userPhoto' className='profileImage' />
                ) : (
                  <AccountCircleIcon className='profileIcon' />
                )}
                {!image && !uploadSuccess && (
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                      type='file'
                      name='photo'
                      id='photo'
                      onChange={(e) => handleChange(e)}
                    />
                    <div className='uploadBtn'>
                      <button type='submit'>upload new photo</button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
          <div className='profileDetails'>
            <h1>details</h1>
            <form onSubmit={onsubmit}>
              <div className='form__control'>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='please enter name'
                  required
                />
              </div>
              <div className='form__control'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='please enter email'
                  required
                />
              </div>
              <div className='form__control'>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  placeholder='please enter phone'
                  required
                />
              </div>
              <div className='form__control'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='please enter password'
                  required
                />
              </div>
              <div className='form__control'>
                <input
                  type='text'
                  name='address'
                  id='address'
                  placeholder='type address'
                  required
                />
              </div>
              <div className='form__control button-container'>
                <button className='btn'>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
