import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import './pages.css'

export default function SignUp() {

    const { setCurrentUser,  setUserLoggedIn, API_URL} = useContext(LoginContext);
    const navigate = useNavigate();

    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        displayName: "",
        age: "",
        email: "",
        address: "",
        description: ""
    })

    const createNewUser = async (newUser) => {
        const url = API_URL + "/users"
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newUser)
        };

        const response = await fetch(url, fetchOptions);
        
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);

        }
        return response.json();
    }
 
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const user = await createNewUser(formData)
        if (user.length) {
            setError(user)
        } else {
            setCurrentUser(user.user)
            setUserLoggedIn(true)
            localStorage.setItem("petsJWT", JSON.stringify({token: user.token, username: user.user.username, user_id: user.user.id}))
            navigate(`/users/${user.user.id}/dashboard`)
        }   
    }

  return (
    <div className='signup-page'>
    <h1 className='page-title'>Sign Up</h1>
    {error && error.map(error => <p key={error}>{error}</p>)}
    <form className='signup-form' onSubmit={handleFormSubmit}>
            <label>Username</label>
            <input type='text' name='username' value={formData.username} onChange={handleFormChange}/>

            <label>Password</label>
            <input type='password' name='password' value={formData.password} onChange={handleFormChange}/>

            <label>Email</label>
            <input type='text' name='email' value={formData.email} onChange={handleFormChange}/>

            <label>Name</label>
            <input type='text' name='display_name' value={formData.display_name} onChange={handleFormChange} />
            
            <label>Address</label>
            <input type='text' name='address' value={formData.address} onChange={handleFormChange} />

            <label>About Me</label>
            <textarea type='text' name='description' value={formData.description} onChange={handleFormChange}/>
            
            <label>Age</label>
            <input type='text' name='age' value={formData.age} onChange={handleFormChange} />

            <input type='submit' className='btn' value="Sign Up"/>
            <h4>Already have an account? <Link to='/users/login'>Login</Link></h4>
        </form>
      
    </div>
  )
}
