import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';
import { logUserIn, getCurrentUser, authenticateUser, deleteAccount } from './../api/user_api';
import './pages.css'
import './../components/Forms.css'


export default function DeleteAccount() {
   
    const params = useParams()
    const navigate = useNavigate();
    const { currentUser, setCurrentUser, setUserLoggedIn, API_URL } = useContext(LoginContext);
    const [errors, setErrors] = useState(null);

    const [formData, setFormData] = useState({
        email: (currentUser ? currentUser.email : ""),
        password: ""
    })

    const getUser = async() => {
        const apiResponse = await getCurrentUser()
        if (apiResponse !== null && apiResponse !== undefined) {
        setFormData({
            ...formData,
              email: apiResponse.email
          })
        }
    }

    useEffect(() => {
        const auth = authenticateUser()
    
        if (auth === true) {
            getUser()
            console.log('User authenticated:', auth)
        } else {
        localStorage.removeItem("petsJWT")
          setUserLoggedIn(false)
          setCurrentUser(null)
          navigate(`/users/login`)
        }
    
      }, [])
    

    const handleFormChange = (e) => {
        setFormData({
                  ...formData,
                    [e.target.name]: e.target.value
                })
    }

    const handleCancel = () => {
        navigate(`/users/${params.id}/dashboard`)}

    async function handleDelete (e) {
        const loginResponse = await logUserIn(formData)
        if (loginResponse.status.code && loginResponse.status.code === 200) {
            const deletedUser = await deleteAccount(params.id)
            if (deletedUser !== null && deletedUser !== undefined) {
                localStorage.removeItem("petsJWT")
                setUserLoggedIn(false)
                setCurrentUser(null)
                navigate('/users/accountdeleted')
            }
        } else {
            setErrors("Delete failed! You must enter the correct password to delete your account.")
        }
    }

  return (
    <div className='delet-account-page'>
        <h1>Are you sure you want to delete your account?</h1>
        {errors && <h4>Error: {errors}</h4>}
        <input
            type='password'
            name='password'
            placeholder='password'
            value={formData.password}
            onChange={handleFormChange}
        />
        <div className='delete-btn-container'>
            <button className='btn btn-delete-account' onClick={handleDelete}>Yes, delete</button>
            <button className='btn btn-cancel' onClick={handleCancel}>Cancel</button>
        </div>
    </div>
  )
}
