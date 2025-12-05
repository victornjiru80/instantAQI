import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 text-slate-900">
      <aside className="relative flex items-center justify-center bg-sky-50 p-8 sm:p-12">
        <div className="max-w-lg w-full text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-muted-foreground tracking-tight">
            Instant<span className="text-sky-500">AQI</span>
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Create your account to track air quality in your city, receive timely alerts, and access health
            recommendations tailored to your profile and location.
          </p>
          <div className="mt-8 hidden sm:block">
            <img
              src="/pollution.png"
              alt="Air pollution illustration"
              className="w-full max-w-md mx-auto lg:mx-0 rounded-xl shadow-md"
            />
          </div>
        </div>
      </aside>

      <main className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Create account</h2>
            <p className="mt-1 text-sm text-slate-600">Join InstantAQI in a few seconds.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type='submit'
              className='inline-flex w-full justify-center rounded-lg bg-sky-600 px-4 py-2.5 font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50'
            >
              Create account
            </button>
          </form>

          <p className='mt-4 text-sm text-slate-600'>
            Already have an account?{' '}
            <Link to='/' className='text-sky-600 hover:underline'>Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Register