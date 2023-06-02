import React from 'react'
import { useState, useContext } from 'react';
// import { useAppState } from '../AppState';
import './pages.css'
import { LoginContext } from '../contexts/LoginContext';
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
    const {currentUser, setCurrentUser} = useContext(LoginContext);
    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })


    // const [userData, setUserData] = useState(null)
    // const {state, dispatch} = useAppState();
    // console.log(state)

    // useEffect(() => {
    //     if (userData) {
    //         console.log(userData)
    //         const {token, user} = userData
    //         dispatch({type: "login", payload: {token: token, user: user.username}})
    //         }}
    // , [userData])

    const action = {
            type: "login",
            payload: formData
        }


    // const action = {
    //     login: () => {
    //         return fetch("http://project4-rails-api.herokuapp.com" + "/users/login", {
    //             method: "POST",
    //                             headers: {
    //                                 "Content-Type": "application/json"
    //                             },
    //                             body: JSON.stringify(formData)
    //         }).then(response => response.json())
    //     }
    // }

    const handleFormChange = (e) => {
        setFormData({
                  ...formData,
                    [e.target.name]: e.target.value
                })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // dispatch({type: action['type']});

        fetch("http://project4-rails-api.herokuapp.com/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        })
            .then(response => response.json())
            .then(user => {
               
             setCurrentUser(user.user)
             setUserLoggedIn(true)
             localStorage.setItem("petsJWT", JSON.stringify({token: user.token, username: user.user.username, user_id: user.user.id}))
             navigate(`/users/dashboard`)
            })
        // action['login']().then(data => { setUserData(data) })
        }

    

  return (
    <div className='login-page'>
        <h1 className='page-title'>Login</h1>
        <form className="login-form" onSubmit={handleFormSubmit}>
            <label>Username</label>
            <input type='text' name='username' value={formData.username} onChange={handleFormChange}/>
            
            <label>Password</label>
            <input type='password' name='password' value={formData.password} onChange={handleFormChange}/>
            
            <input type='submit' value="Log In"/>
        </form>

      
    </div>
  )
}
