import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/context'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(`${backendUrl}/api/login`, {email, password});
        if(data.message === 'Login successful'){
          setIsLoggedIn(true);
          await getUserData();
          toast.success('Login successful')
          navigate('/dashboard')
        }
      } catch (error) {
        if(error.response && error.response.status === 400){
          toast.error(error.response.data.message || 'Invalid credentials');
          console.log('Login error:', error.response.data)
        } else {
          console.error('Login error:', error)
          toast.error('Login failed. Please try again.')
        }
      }
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-2xl text-blue-400 font-bold text-muted-foreground'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <input type="text" placeholder='Email' className='border-2 border-gray-300 rounded-md p-2' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' className='border-2 border-gray-300 rounded-md p-2' value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className='text-sm text-gray-500'>Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link></p>  
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Login</button>
        </form>
    </div>
  )
}

export default Login