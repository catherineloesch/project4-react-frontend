import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { getCurrentUser, authenticateUser, updateUser } from '../api/user_api';
import './pages.css'

export default function EditUser() {

    const { setCurrentUser, setUserLoggedIn } = useContext(LoginContext);
    
    const navigate = useNavigate();
    const params = useParams()

    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({})

    const getUser = async() => {
        const apiResponse = await getCurrentUser()
        if (apiResponse !== null && apiResponse !== undefined) {
        setCurrentUser(apiResponse)
        setUserLoggedIn(true)
        setFormData({
            display_name: apiResponse.display_name,
            age: apiResponse.age,
            email: apiResponse.email,
            address: apiResponse.address,
            description: apiResponse.description
        })
    }}
    
      useEffect(() => {
        const auth = authenticateUser()
    
        if (auth === true) {
            getUser()
        
        } else {
            localStorage.removeItem("petsJWT")

          setUserLoggedIn(false)
          setCurrentUser(null)
          navigate(`/users/login`)
        }
    
      }, [])

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const apiResponse = await updateUser(params.id, formData)

        if (apiResponse.error) {
            setErrors(apiResponse)
        } else {
            navigate(`/users/${params.id}/profile`)
        }  
    }

  return (
    <div className='edit-user-page'>
  
        <form className='edit-user-form' onSubmit={handleFormSubmit}>
            <h1 className='page-title'>Edit Profile</h1>
            {errors && <h4 className='edit-user-errors'>Server Error: {errors.status} {errors.error}!</h4>}
           
            <input
                type='text'
                name='email'
                placeholder='email'
                value={formData.email}
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
                name='address'
                placeholder='Address'
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
                type='text'
                name='age'
                placeholder='Age'
                value={formData.age}
                onChange={handleFormChange}
                autoComplete="off"

            />

            <input
                type='submit'
                className='btn'
                value="Save Changes"
            />
            
        </form>
      
    </div>
  )
}
