import { useState } from 'react';
import axios from 'axios';

const Login = () => {

    const[user, setUser] = useState('');
    const[pass, setPass] = useState('');
    const[error, setError] = useState('');
    const[success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        // post request to backend api route
        // onSubmit={handleSubmit}
        e.preventDefault();

        try {
          // console.log("user: ", user)
          // console.log("pass: ", pass)
            const response = await axios.post('http://localhost:4000/login', { user, pass });
        if (response.status === 200) {
          setSuccess('Login successful')
          setError('')
        }
        } catch (error) {
        if (error.response && error.response.status === 404) {
          setSuccess('')
          setError('Invalid username or password');
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    }

    return (
        <div className='absolute drop-shadow-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-1/3 main-container inner content rounded-md' 
             onSubmit={handleSubmit}>
          <h2 className="text-5xl p-5 font-bold">Sign In</h2>
          <div className="flex space-x-1">
            <p className=''>Don't have an account?</p>
            <a className="text-blue-600" href="/register">Sign Up</a>
          </div>
          <hr className="border-black w-3/4"/>
          <form className='LoginForm p-4'>
              <label className='font-bold'>Username:</label>
              <input 
                  type="text" 
                  value={user} 
                  onChange={(e) => setUser(e.target.value)} 
                  required
              />
              <label className='font-bold'>Password:</label>
              <input 
                  type="text" 
                  value={pass} 
                  onChange={(e) => setPass(e.target.value)} 
                  required 
              />
              <button className="sessionButton rounded w-3/4">Register</button>
          </form>
          {error && <div className = 'error text-red-500'>{error}</div>}
          {success && <div className = 'success text-green-500'>{success}</div>}
        </div>
    )
}

export default Login