import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { createNewUser } from '../api/user_api';
import './pages.css'

export default function SignUp() {

    const { setCurrentUser, setUserLoggedIn } = useContext(LoginContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        display_name: "",
        age: "",
        email: "",
        address: "",
        description: ""
    })

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const setUser = async (user) => {
        await setCurrentUser(user)
        await setUserLoggedIn(true)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const apiResponse = await createNewUser(formData)

        if (apiResponse.error) {
            setErrors(apiResponse.message.split('.')[1])
        }
        else {
            await setUser(apiResponse.data)
            navigate(`/users/${apiResponse.data.id}/dashboard`)
        }
    }


  return (
    <div className='signup-page'>
  
        <form className='signup-form' onSubmit={handleFormSubmit}>
            <h1 className='page-title'>Sign Up</h1>
            {errors && <h4>Error: {errors}!</h4>}
           
            <input
                type='text'
                name='email'
                placeholder='email'
                value={formData.email}
                onChange={handleFormChange}
            />

            <input
                type='password'
                name='password'
                placeholder='password'
                value={formData.password}
                onChange={handleFormChange}
            />

            <input
                type='text'
                name='display_name'
                placeholder='Name'
                value={formData.display_name}
                onChange={handleFormChange} 
            />
            
            <input
                type='text'
                name='address'
                placeholder='Address'
                value={formData.address}
                onChange={handleFormChange}
            />

            <textarea
                type='text'
                name='description'
                placeholder="Tell us about yourself"
                value={formData.description}
                onChange={handleFormChange}
            />
            
            <input
                type='text'
                name='age'
                placeholder='Age'
                value={formData.age}
                onChange={handleFormChange}
            />

            <input
                type='submit'
                className='btn'
                value="Sign Up"
            />

            <h4>Already have an account?</h4>
            <Link to='/users/login'>Login</Link>
            
        </form>
      
    </div>
  )
}
