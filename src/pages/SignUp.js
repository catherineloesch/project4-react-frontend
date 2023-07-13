import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { createNewUser, updateUser } from '../api/user_api';
import './pages.css'
import './../components/Forms.css'

export default function SignUp(props) {

    const { setCurrentUser, setUserLoggedIn } = useContext(LoginContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({
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

        let apiResponse = await createNewUser(formData)

        if (apiResponse.error) {
            setErrors(apiResponse.message.split('.')[1])
        }
        else {
            console.log(apiResponse.data.display_name)
            if (apiResponse.data.display_name === "") {
                console.log('no name')
                apiResponse.data = {...apiResponse.data, display_name: `User ${apiResponse.data.id}`}
                updateUser(apiResponse.data.id, apiResponse.data)
                console.log(apiResponse.data)
                props.setUserName(`User ${apiResponse.data.id}`)
            }
            await setUser(apiResponse.data)

            navigate(`/users/${apiResponse.data.id}/dashboard`)
        }
            
        
    }


  return (
    <div className='signup-page'>
  
        <form className='signup-form' onSubmit={handleFormSubmit}>
            <h1 className='page-title'>Register</h1>
            {errors && <h4 className='signup-errors'>Error: {errors}!</h4>}
           
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
                autoComplete="off"

            />

            <input
                type='text'
                name='display_name'
                placeholder='Name'
                value={formData.display_name}
                onChange={handleFormChange} 
                autoComplete="off"

            />

                  
            <input
                type='text'
                name='age'
                placeholder='Age'
                value={formData.age}
                onChange={handleFormChange}
                autoComplete="off"

            />
            
            <input
                type='text'
                name='address'
                placeholder='Location'
                value={formData.address}
                onChange={handleFormChange}
                autoComplete="off"

            />

            <textarea
                type='text'
                name='description'
                placeholder="Tell us about yourself"
                value={formData.description}
                onChange={handleFormChange}
                autoComplete="off"

            />

            <input
                type='submit'
                className='btn'
                value="Sign Up"
            />

            <p>Already have an account?</p>
            <Link to='/users/login'>Login</Link>
            
        </form>
      
    </div>
  )
}