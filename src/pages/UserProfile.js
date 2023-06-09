import React from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import { getUserById } from './../api/user_api'
import { useState, useContext, useEffect } from 'react';
import { getCurrentUser, authenticateUser, updateUser } from '../api/user_api';
import { LoginContext } from '../contexts/LoginContext';


export default function UserProfile() {
    const params = useParams()
    const { setCurrentUser, setUserLoggedIn } = useContext(LoginContext);
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
  
            getUserById(params.id)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })

    
      }, [])
  
   
    let heading;
    if (user) {
        if (user.display_name) {
            if (user.age) {
                heading = (<h1>{user.display_name}, <span>{user.age}</span></h1>)
            } else {
                heading = (<h1>{user.display_name}</h1>)
            }
        } else {
            heading = (<h1>User #{user.id}</h1>)
        }

    }



  return (
    <div className='profile'>
      <div className='profile-content'>
        {user && heading}
        {user && (user.address && <p><span className='title'>Location:</span> {user.address}</p>)}
        {user && (user.email && <p><span className='title'>Contact: </span>{user.email}</p>)}
        {user && (user.description &&<p><span className='title' id='about-me'>About Me:</span><br></br> {user.description}</p>)}
      </div>
    </div>
  )
}
