import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Profile.scss'
// import { uploadProfileImage } from '../../features/upload/uploadSlice'
// import axios from 'axios'

const Profile = () => {
  const dispatch = useDispatch()

  const { name, _id, token } = useSelector((state) => state.auth.user)
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    PreviewFile(file)
    setFileInputState(e.target.value)
  }

  const PreviewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!previewSource) return
    uploadImage(previewSource)
  }

  const uploadImage = async (previewSource) => {
    try {
      await fetch(`http://localhost:8080/api/upload/${_id}`, {
        method: 'POST',
        body: JSON.stringify({ data: previewSource }),
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      setFileInputState('')
      setPreviewSource('')
      console.log('somenthing went wrong')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='profile'>
      <Sidebar />
      <div className='profileContainer'>
        <Navbar />
        <div className='userProfile'>
          <div className='profilePhoto'>
            <h1>{name}</h1>
            {previewSource ? (
              <img src={previewSource} alt='image' className='profileImage' />
            ) : (
              <img
                src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                alt='image'
                className='profileImage'
              />
            )}
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <input
                type='file'
                name='image'
                id='image'
                onChange={handleFileInputChange}
                value={fileInputState}
              />
              <div className='uploadBtn'>
                <button type='submit'>upload new photo</button>
              </div>
            </form>
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
