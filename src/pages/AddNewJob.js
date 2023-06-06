import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { createNewJob } from './../api/job_api';
import './pages.css'

export default function AddNewJob() {
    const [error, setError] = useState(false);

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


  async function handleFormSubmit (e) {
        e.preventDefault();
        createNewJob(params.id, formData, token).then(newJob => {

        if (!newJob.error) {
            navigate(`/users/${params.id}/jobs/${newJob.id}`)
        } else {
            console.log(newJob)
            setError(true)
        }})
    }

  return (
    <div className='new-job-page'>
    <h1>Add new job:</h1>
        {error && <div className='error-message'>Server Error. Job could not be created.</div>}
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
