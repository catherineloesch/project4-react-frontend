import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import './pages.css'

export default function AddNewJob() {
    const { API_URL } = useContext(LoginContext);

    const params = useParams()
    const token = JSON.parse(localStorage.getItem('petsJWT')) 
    const navigate = useNavigate();

    const job_types = [
        'Dog Walking',
        'Boarding',
        'Pet + House Sitting',
        'Doggy Day Care',
        'Drop-In Visit(s)'
    ]

    const [formData, setFormData] = useState({
        "title": "",
        "description": "",
        "job_type": "",
        "pay": "",
        "start_date": "",
        "start_time": "",
        "end_date": "",
        "end_time": "",
        "location": "",
        "user_id": params.id
    })

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function createNewJob(user_id, formData, token) {
        const url = API_URL + `/users/${user_id}/jobs`
        
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.token 
            },
            body: JSON.stringify(formData)
        };

        try {
            const response = await fetch(url, fetchOptions);
            const data = await response.json()
            return data

        } catch(error) {
            console.log(error)
        }
}
  async function handleFormSubmit (e) {
        e.preventDefault();
        console.log(formData)
        const newJob = await createNewJob(params.id, formData, token)
        if (!newJob.errors) {
            navigate(`/users/${params.id}/jobs/${newJob.id}`)
        }
    }

  return (
    <div className='new-job-page'>
    <h1>Add new job:</h1>
        <form className='new-job-form' onSubmit={handleFormSubmit}>

        <label>Title</label>
        <input type='text' name='title' value={formData.title} onChange={handleFormChange} />

        <label>Description</label>
        <textarea type='text' name='description' value={formData.description} onChange={handleFormChange} />

        <label>Job Type</label>
        <select name='job_type' onChange={handleFormChange}>
            {job_types.map((t, i) => (<option key={i} value={t}>{t}</option>))}
        </select>

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
