import { useState } from 'react';
import axios from 'axios';

const Register = () => {

    const[user, setUser] = useState('');
    const[pass, setPass] = useState('');
    const[error, setError] = useState('');
    const[success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        // post request to backend api route for registering new users
        e.preventDefault();

        try {
          // console.log("user: ", user)
          // console.log("pass: ", pass)
            const response = await axios.post('http://localhost:4000/register', { user, pass });
        if (response.status === 201) {
          setSuccess('Register successful')
          setError('')
        }
        } catch (error) {
        if (error.response && error.response.status === 500) {
          setSuccess('')
          setError('An error occurred. Please try again.');
        }
      }
    }

    return (
        <div className='absolute drop-shadow-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-1/3 main-container inner content rounded-md' 
             onSubmit={handleSubmit}>
          <h2 className="text-5xl p-5 font-bold">Sign Up</h2>
          <div className="flex space-x-1">
            <p className=''>Already have an account?</p>
            <a className="text-blue-600" href="/">Sign In</a>
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

export default Register