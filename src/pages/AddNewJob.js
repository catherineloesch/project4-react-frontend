import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { createNewJob } from './../api/job_api';
import './pages.css'
import './../components/Forms.css'
import DatePicker from'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment-timezone';


export default function AddNewJob() {
    const [error, setError] = useState(false);

    const params = useParams()
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

    const handleEndDateChange = (date) => {
        setFormData({...formData, end_date: date })
    }

    const handleStartDateChange = (date) => {
        console.log(date)
        console.log(date.toISOString())
        setFormData({...formData, start_date: date })
    }

    async function handleFormSubmit (e) {
        e.preventDefault();
        console.log(formData)
        createNewJob(params.id, formData).then(newJob => {

        if (!newJob.error) {
            navigate(`/users/${params.id}/jobs/${newJob.id}`)
        } else {
            console.log(newJob)
            setError(true)
        }})
    }

    const startDateInput = (<div><DatePicker
        
        name='start_date'
        autoComplete="off"
        selected={formData.start_date}
        onChange={handleStartDateChange}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        wrapperClassName="datePicker"
        
    /></div>)
    const endDateInput = ( <div><DatePicker
        name='end_date'
        autoComplete="off"
        selected={formData.end_date}
        onChange={handleEndDateChange}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        wrapperClassName="datePicker"

    /></div>)

    return (
    <div className='new-job-page'>
    
        <form className='new-job-form' onSubmit={handleFormSubmit}>
            <h1>Add new job:</h1>  
            <div className='error-message'>{error ? "Server Error. Job could not be created." : " "}</div>
            <input
                type='text'
                name='title'
                placeholder='Title'
                value={formData.title}
                onChange={handleFormChange}
                autoComplete="off"
            />
           
            <textarea
                type='text'
                name='description'
                placeholder='Details'
                value={formData.description}
                onChange={handleFormChange}
                autoComplete="off"
            />

            <input
                type='text'
                name='location'
                placeholder='Location'
                value={formData.location}
                onChange={handleFormChange}
                autoComplete="off"
            />

            <input
                type='text'
                name='pay'
                placeholder='Pay'
                value={formData.pay}
                onChange={handleFormChange}
                autoComplete="off"
            />

            <div className='type-container'>
                <label>Job Type</label>
                <select name='job_type' onChange={handleFormChange}>
                    {job_types.map((t, i) => (<option key={i} value={t}>{t}</option>))}
                </select>
            </div>

            <div className='date-container'>
                <label>Start Date:</label>
                <div className='date-input'>{startDateInput}</div>
            </div>

            <div className='time-container'>
                <label>Start Time</label>
                <input
                    className='time-input'
                    type='text'
                    name='start_time'
                    value={formData.start_time}
                    onChange={handleFormChange}
                    autoComplete="off"
                />
            </div>
  
            <div className='date-container'>
                <label>End Date</label>
                <div className='date-input'>{endDateInput}</div>
            </div>
            
            <div className='time-container'>
                <label>End Time</label>
                <input
                    type='text'
                    name='end_time'
                    value={formData.end_time}
                    onChange={handleFormChange}
                    autoComplete="off"
                />
            </div>



            <input
                type='submit'
                className='btn'
                value="Post Job"
            />

        </form>
    </div>
  )
}
