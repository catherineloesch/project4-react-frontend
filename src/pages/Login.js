import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { logUserIn } from '../api/user_api';
import './pages.css'

export default function Login() {
    const { currentUser, setCurrentUser, userLoggedIn, setUserLoggedIn, API_URL} = useContext(LoginContext);
    const navigate = useNavigate();

    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const setUser = async (user) => {
        await setCurrentUser(user)
        await setUserLoggedIn(true)
    }
    
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const apiResponse = await logUserIn(formData)
        console.log('return from login function:')
        console.log(apiResponse)

        if (apiResponse.status.code !== 200) {
            setError(apiResponse)
        }
        else {
            await setUser(apiResponse.data)
        }
        navigate(`/users/${apiResponse.data.id}/dashboard`)

    }
    
  return (
    <div className='login-page'>
        <h1 className='page-title'>Login</h1>
        {error && <p>{error.error}</p>}
        <form className="login-form" onSubmit={handleFormSubmit}>
            <label>Email</label>
            <input type='text' name='email' value={formData.email} onChange={handleFormChange}/>
            
            <label>Password</label>
            <input type='password' name='password' value={formData.password} onChange={handleFormChange}/>
            
            <input type='submit' className='btn' value="Log In"/>

            <h4>Don't have an account? <Link to='/users/signup'>Sign Up</Link></h4>

        </form>
      
    </div>
  )
}
