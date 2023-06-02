import React from 'react'
import { useState } from 'react';

import { Link, useNavigate, useParams } from "react-router-dom";
import './pages.css'

export default function AddNewJob() {
    const params = useParams()
    

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
        setFormData({
                  ...formData,
                    [e.target.name]: e.target.value
                })
    }

  return (
    <div className='new-job-page'>
    <h1>Add new job:</h1>
        <form className='new-job-form'>

        <label>Title</label>
        <input type='text' name='title' value={formData.title} onChange={handleFormChange} />

        <label>Description</label>
        <input type='text' name='description' value={formData.description} onChange={handleFormChange} />

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

        <input type='submit' value="Post Job"/>

        </form>
      
    </div>
  )
}
