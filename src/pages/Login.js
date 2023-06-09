import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { logUserIn } from '../api/user_api';
import './pages.css'
import './../components/Forms.css'

export default function Login() {
    const { setCurrentUser, setUserLoggedIn } = useContext(LoginContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const apiResponse = await logUserIn(formData)

        if (apiResponse.error) {
            setErrors(apiResponse.error.slice(0, -1))

        } else {
            await setCurrentUser(apiResponse.data)
            await setUserLoggedIn(true)
            navigate(`/users/${apiResponse.data.id}/dashboard`)
        }
    }
    
  return (
    <div className='login-page'>

        <form className="login-form" onSubmit={handleFormSubmit}>

        <h1 className='page-title'>Login</h1>
       
        {errors && <h4 className='login-errors'>Error: {errors}!</h4>}
           
            <input
                type='text'
                name='email'
                placeholder='email'
                value={formData.email}
                onChange={handleFormChange}
                autoComplete="off"

            />
            
            <input
                type='password'
                name='password'
                placeholder='password'
                value={formData.password}
                onChange={handleFormChange}
            />
            
            <input
                type='submit'
                className='btn'
                value="Log In"
            />

            <p>Don't have an account?</p>
            <Link to='/users/signup'>Sign Up</Link>
        </form>
    </div>
  )
}