import React, { useState, useContext } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 text-slate-900">
      <aside className="relative flex items-center justify-center bg-sky-50 p-8 sm:p-12">
        <div className="max-w-lg w-full text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-muted-foreground tracking-tight">
            Instant<span className="text-sky-500">AQI</span>
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Monitor real-time air quality and get personalized health recommendations. InstantAQI helps you understand
            what is in the air you breathe so you can plan safer outdoor activities and protect your loved ones.
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
            <h2 className="text-2xl font-semibold">Sign in</h2>
            <p className="mt-1 text-sm text-slate-600">Welcome back. Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              Sign in
            </button>
          </form>

          <p className='mt-4 text-sm text-slate-600'>
            Don't have an account?{' '}
            <Link to='/register' className='text-sky-600 hover:underline'>Create one</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Login