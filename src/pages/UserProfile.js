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
        const auth = authenticateUser()
    
        if (auth === true) {
            getUserById(params.id)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
        } else {
          setUserLoggedIn(false)
          setCurrentUser(null)
          navigate(`/users/login`)
        }
    
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
    <div>
      {user && heading}
      {user && (user.address && <p>Location: {user.address}</p>)}
      {user && (user.email && <p>Contact: {user.email}</p>)}
      {user && (user.description && <p>About Me: {user.description}</p>)}
    </div>
  )
}
