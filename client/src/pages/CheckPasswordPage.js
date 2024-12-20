import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';


const CheckPasswordPage = () => {

  // Initialize component state to manage password input
  const [data, setData] = useState({
    password: ""
  })

  // hooks for navigation, location, and dispatching Redux actions
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  console.log("location", location.state)

  // Effect to redirect to the email page if user data (name) is missing in location state
  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/email')
    }
  }, [])

   // Handler for input change, updates the password state dynamically
  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  // Handler for form submission, checks password against backend API
  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

    try {
      // Send POST request to validate password
      const response = await axios({
        method : 'post',
        url: URL,
        data: {
          userId: location?.state?._id, // User ID from location state
          password: data.password
        },
        withCredentials : true
      })

      toast.success(response.data.message)

      if (response.data.success) {
        // If successful, store token in Redux and local storage, then reset password field
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)

        setData({
          password: ""
        })

        navigate('/')
      }

    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }


  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>

        <div className='w-fit mx-auto mb-2 flex justtify-center items-center flex-col'>
          {/* <PiUserCircle
        size={80}
        /> */}

          <Avatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
        </div>

        <h3>Welcom to Mugen Talk!</h3>

        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password :</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Login
          </button>

        </form>

        <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold hover:underline'>Forgot password?</Link></p>
      </div>
    </div>
  )
}

export default CheckPasswordPage







