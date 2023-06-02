import React from 'react'
import { useState, useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { useNavigate, useParams } from "react-router-dom";
import './pages.css'


export default function DeleteJob() {
    const params = useParams()
    const token = JSON.parse(localStorage.getItem('petsJWT')) 
    const navigate = useNavigate();
    const { currentUser, setCurrentUser, setUserLoggedIn, API_URL } = useContext(LoginContext);

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

    async function deleteAccount(user_id, token) {
        const url = API_URL + `/users/${user_id}`
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.token
            }
        }
        const response = await fetch(url, fetchOptions);
        
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    
        return response.json();
    }

    const [formData, setFormData] = useState({
        username: (currentUser ? currentUser.username : ""),
        password: ""
    })

 

    async function handleDelete (e) {
        await logUserIn(formData) 
        const deletedUser = await deleteAccount(params.id, token)
        console.log(deletedUser.id)

        if (deletedUser.id) {
            localStorage.removeItem("petsJWT")
            setUserLoggedIn(false)
            setCurrentUser(null)
            navigate('/users/accountdeleted')
        } else {
            navigate(`/users/login`)
        }
    }
    const handleFormChange = (e) => {
        setFormData({
                  ...formData,
                    [e.target.name]: e.target.value
                })
    }


    const handleCancel = () => (navigate(`/users/${params.id}/dashboard`))

   



  return (
    <div className='delet-account-page'>
    <h1>Are you sure you want to delete your account?</h1>
    <label>Password</label>
    <input type='password' name='password' value={formData.password} onChange={handleFormChange}/>
        <button onClick={handleDelete}>Yes, delete</button>
        <button onClick={handleCancel}>Cancel</button>

   
    </div>
  )
}
