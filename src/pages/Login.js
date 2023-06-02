import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import './pages.css'

export default function Login() {
    const { setCurrentUser, setUserLoggedIn, API_URL} = useContext(LoginContext);
    const navigate = useNavigate();

    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const logUserIn = async (loginDetails) => {
        const url = API_URL + "/users/login"

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(loginDetails)
        };
        const response = await fetch(url, fetchOptions);
        
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);

        }
        return response.json();

    }

    const handleFormChange = (e) => {
        setFormData({
                  ...formData,
                    [e.target.name]: e.target.value
                })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const user = await logUserIn(formData)

        if (user.error) {
            setError(user)
        }
        else {
            setCurrentUser(user.user)
            setUserLoggedIn(true)
            localStorage.setItem("petsJWT", JSON.stringify({token: user.token, username: user.user.username, user_id: user.user.id}))
            navigate(`/users/${user.user.id}/dashboard`)
        }
    }
        
    

  return (
    <div className='login-page'>
        <h1 className='page-title'>Login</h1>
        {error && <p>{error.error}</p>}
        <form className="login-form" onSubmit={handleFormSubmit}>
            <label>Username</label>
            <input type='text' name='username' value={formData.username} onChange={handleFormChange}/>
            
            <label>Password</label>
            <input type='password' name='password' value={formData.password} onChange={handleFormChange}/>
            
            <input type='submit' value="Log In"/>

            <h4>Don't have an account? <Link to='/users/signup'>Sign Up</Link></h4>

        </form>

      
    </div>
  )
}
