import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/context'
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {
    const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(`${backendUrl}/api/register`, {name, email, password});
            if(data.message === 'User created successfully'){
                setIsLoggedIn(true);
                await getUserData();
                toast.success('Registration successful')
                navigate('/dashboard')
            }
        } catch (error) {
            if(error.response && error.response.status === 400){
                toast.error(error.response.data.message || 'Registration error');
                console.log('Registration error:', error.response.data)
            } else {
                console.error('Registration error:', error)
                toast.error('Registration failed. Please try again.')
            }
        }
    }
    
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-2xl text-blue-400 font-bold text-muted-foreground'>Register</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='border-2 border-gray-300 rounded-md p-2' />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='border-2 border-gray-300 rounded-md p-2' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='border-2 border-gray-300 rounded-md p-2' />
            <p className='text-sm text-gray-500'>Already have an account? <Link to='/' className='text-blue-500'>Login</Link></p>
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Register</button>
        </form>
    </div>
  )
}

export default Register