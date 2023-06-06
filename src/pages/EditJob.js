import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { authenticateUser } from './../api/user_api'
import { updateJob, fetchUserJob } from '../api/job_api';

import './pages.css'


export default function EditJob() {
    const { currentUser, setCurrentUser, setUserLoggedIn } = useContext(LoginContext);
    const [errors, setErrors] = useState(null);

    const token = JSON.parse(localStorage.getItem('petsJWT')) 

    const job_types = [
        'Dog Walking',
        'Boarding',
        'Pet + House Sitting',
        'Doggy Day Care',
        'Drop-In Visit(s)'
    ]

    const params = useParams()
    const navigate = useNavigate();

    const [formData, setFormData] = useState({})


    useEffect(

        () => { 

            const auth = authenticateUser()

            if (auth !== true) {
                setUserLoggedIn(false)
                setCurrentUser(null)
                navigate(`/users/login`)
            } else {
            console.log('User authenticated:', auth)
            fetchUserJob(params.id,params.job_id)
            .then(results => results.json())
            .then(data => {
                setFormData({
                    title: data.title,
                    description: data.description,
                    job_type: data.job_type,
                    pay: data.pay,
                    start_date: data.start_date,
                    start_time: data.start_time,
                    end_date: data.end_date,
                    end_time: data.end_time,
                    location: data.location
                })
            })

             
            }

    }, [params.id, params.job_id])

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleFormSubmit (e) {
        e.preventDefault();
        const apiResponse = await updateJob(params.id, params.job_id,formData, token)
        if (apiResponse.error) {
            setErrors(apiResponse)
        } else {
            navigate(`/users/${params.id}/jobs/${apiResponse.id}`)
        }
    }

  return (
    <div className='edit-job-page'>
   
        <form className='edit-job-form' onSubmit={handleFormSubmit}>

            <h1>Edit job:</h1>
            {errors && <h4>Server Error: {errors.status} {errors.error}!</h4>}

            <label>Title</label>
            <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleFormChange}
            />

            <label>Description</label>
            <textarea
                type='text'
                name='description'
                value={formData.description}
                onChange={handleFormChange}
            />

            <label>Job Type</label>
            <select name='job_type' onChange={handleFormChange}>
                {job_types.map((t, i) => (<option key={i} value={t}>{t}</option>))}
            </select>

            <label>pay</label>
            <input
                type='text'
                name='pay'
                value={formData.pay}
                onChange={handleFormChange}
            />
            
            <label>Start Date:</label>
            <input
                type='text'
                name='start_date'
                value={formData.start_date}
                onChange={handleFormChange}
            />
            
            <label>Start Time</label>
            <input
                type='text'
                name='start_time'
                value={formData.start_time}
                onChange={handleFormChange}
            />
       
            <label>End Date</label>
            <input
                type='text'
                name='end_date'
                value={formData.end_date}
                onChange={handleFormChange}
            />
            
            <label>End Time</label>
            <input
                type='text'
                name='end_time'
                value={formData.end_time}
                onChange={handleFormChange}
            />
            
            <label>Location</label>
            <input
                type='text'
                name='location'
                value={formData.location}
                onChange={handleFormChange}
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
