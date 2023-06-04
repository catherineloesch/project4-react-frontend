import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import './pages.css'

export default function SignUp() {

    const { setCurrentUser,  setUserLoggedIn, API_URL} = useContext(LoginContext);
    const navigate = useNavigate();
    const [token, setToken] = useState(null)

    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        display_name: "",
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


    // const createNewUser = async (newUser) => {
    //     const url = 'http://localhost:4000' + '/signup'
    //     const fetchOptions = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({ "user": newUser})
    //     };
        


    //     let response = await fetch(url, fetchOptions)
    //     console.log(response)


    //     const auth = response.headers.get('Authorization').split(' ')[1]
        
    //     async function saveToken() {
    //         setToken(auth)
    //         console.log('auth', auth)
    //         console.log('token', token)
    //     }

    //     await saveToken()
        // .then(response => {
        //     setToken(response.headers.get('Authorization').split(' ')[1])
        // });
   
        // if (!response.ok) {
        //     const errorMessage = await response.text();
        //     throw new Error(errorMessage);

        // }
    //     return response.json()
    // }

    // async function retrieveCurrentUserFromAPI() {

    //     if (token) {
    //         const url = 'http://localhost:4000/current_user/info'
        
    //         const fetchOptions = {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + token
    //         }}

    //         const newUser = await fetch(url, fetchOptions).then(res => res.json())
    //         return newUser

    //     } else {
    //         console.log('no token')
    //         return null
    //     }

    // }



 
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();

    //     const apiResponse = await createNewUser(formData)
    //     console.log('apiResponse')
    //     console.log(apiResponse)
        
    //     if (apiResponse) {
    //         let newUser = await retrieveCurrentUserFromAPI()
    //         if (newUser==null) {
    //             await new Promise(r => setTimeout(r, 5000));
    //             newUser = await retrieveCurrentUserFromAPI()

    //         }
    //         console.log('newUser')
    //         console.log(newUser)
    //     }

  
        // error handling goes here
       

            // setCurrentUser(user.user)
            // setUserLoggedIn(true)
            // localStorage.setItem("petsJWT", JSON.stringify({token: user.token, username: user.user.username, user_id: user.user.id}))
            // navigate(`/users/${user.user.id}/dashboard`)
    
    // }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const user = await createNewUser(formData)
        if (user.length) {
            setError(user)
        } else {
            setCurrentUser(user.user)
            setUserLoggedIn(true)
            console.log('user')
            console.log(user.user)
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
