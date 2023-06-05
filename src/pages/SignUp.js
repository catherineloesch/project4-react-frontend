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

    // ------------------------------------------------------------------------------------------
        ///backend api without devise: project4-rails-api
        //API_URL = "http://project4-rails-api.herokuapp.com"

        // const handleFormSubmit = async (e) => {
        //     e.preventDefault();
        //     const user = await createNewUser(formData)
        //     if (user.length) {
        //         setError(user)
        //     } else {
        //         setCurrentUser(user.user)
        //         setUserLoggedIn(true)
        //        
        //         localStorage.setItem("petsJWT", JSON.stringify({token: user.token, username: user.user.username, user_id: user.user.id}))
        //         navigate(`/users/${user.user.id}/dashboard`)
        //     }   
        // }
    // -------------------------------------------------------------------------------------------

  return (
    <div className='signup-page'>
    <h1 className='page-title'>Sign Up</h1>
    {errors && <h4>Error: {errors}!</h4>}
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
