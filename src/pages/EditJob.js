import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import './pages.css'


export default function EditJob() {
    const { API_URL } = useContext(LoginContext);
    const token = JSON.parse(localStorage.getItem('petsJWT')) 

    const params = useParams()
    const navigate = useNavigate();

    const [formData, setFormData] = useState({})
    async function fetchJob() {
        return fetch(API_URL + `/users/${params.id}/jobs/${params.job_id}`)

    }

    useEffect(
        
        () => { 
            
            fetchJob(params.id,params.job_id)
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
    }, [params.id, params.job_id, fetchJob])

    async function updateJob(user_id, job_id, updatedJob, token) {
        const url = API_URL + `/users/${user_id}/jobs/${job_id}`
        const fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.token
            },
            body: JSON.stringify(updatedJob)
        }

        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    
        return response.json();
    }
  

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleFormSubmit (e) {
        e.preventDefault();
        const updatedJob = await updateJob(params.id, params.job_id,formData, token)
        if (!updatedJob.errors) {
            navigate(`/users/${params.id}/jobs/${updatedJob.id}`)
        }
    }

   



  return (
    <div className='new-job-page'>
    <h1>Edit job:</h1>
        <form className='new-job-form' onSubmit={handleFormSubmit}>

        <label>Title</label>
        <input type='text' name='title' value={formData.title} onChange={handleFormChange} />

        <label>Description</label>
        <textarea type='text' name='description' value={formData.description} onChange={handleFormChange} />

        <label>Job Type</label>
        <input type='text' name='job_type' value={formData.job_type} onChange={handleFormChange} />
        
        <label>pay</label>
        <input type='text' name='pay' value={formData.pay} onChange={handleFormChange} />
        
        <label>Start Date:</label>
        <input type='text' name='start_date' value={formData.start_date} onChange={handleFormChange} />
        
        <label>Start Time</label>
        <input type='text' name='start_time' value={formData.start_time} onChange={handleFormChange} />
       
        <label>End Date</label>
        <input type='text' name='end_date' value={formData.end_date} onChange={handleFormChange} />
        
        <label>End Time</label>
        <input type='text' name='end_time' value={formData.end_time} onChange={handleFormChange} />
        
        <label>Location</label>
        <input type='text' name='location' value={formData.location} onChange={handleFormChange} />

        <input type='submit' className='btn' value="Post Job"/>

        </form>
    </div>
  )
}
