import React from 'react'
import { useState } from 'react';
// import { useAppState } from './../AppState';
import './pages.css'

import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { Link, useNavigate } from "react-router-dom";


export default function SignUp() {

    const {currentUser, setCurrentUser} = useContext(LoginContext);
    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);

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

    // const { dispatch } = useAppState();

    const action = {
            type: "signup",
            payload: formData
    }

 

    const handleFormChange = (e) => {
        setFormData({
                  ...formData,
                    [e.target.name]: e.target.value
                })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // console.log(action.type)
        // dispatch(action['type']);
        fetch("http://project4-rails-api.herokuapp.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        })
            .then(response => response.json())
            .then(user => {
                if (user.length) {
                    setError(user)
                } else {
                    console.log(user)
                    setCurrentUser(user.user)
                    setUserLoggedIn(true)
                    localStorage.setItem("petsJWT", JSON.stringify({token: user.token, username: user.user.username, user_id: user.user.id}))
                    navigate(`/users/${user.user.id}/dashboard`)

                }
       
            })
        }
        
    console.log(error)

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
            <input type='text' name='display_name' value={formData.displayName} onChange={handleFormChange} />
            
            <label>Address</label>
            <input type='text' name='address' value={formData.address} onChange={handleFormChange} />

            <label>About Me</label>
            <input type='text' name='description' value={formData.description} onChange={handleFormChange}/>
            
            <label>Age</label>
            <input type='text' name='age' value={formData.age} onChange={handleFormChange} />



            <input type='submit' value="Sign Up"/>
        </form>
      
    </div>
  )
}
