import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { authenticateUser } from './../api/user_api'
import { updateJob, fetchUserJob } from '../api/job_api';
import './pages.css'
import './../components/Forms.css'


export default function EditJob() {
    const { setCurrentUser, setUserLoggedIn } = useContext(LoginContext);
    const [errors, setErrors] = useState(null);
   
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


    const displayDate = (d) => {
        // time zone issue, db doesn't have same time zone as react app  
        const day = (parseInt(d.slice(8, 10))+1) <10 ? "0" + (parseInt(d.slice(8, 10))+1) : (parseInt(d.slice(8, 10))+1)
        const month= d.slice(5, 7)
        const year = d.slice(0, 4)
          return `${day}/${month}/${year}`
      }

      const displayTime = (t) => {
        return `${t.slice(11, 13)}:${t.slice(14, 16)}`
    }

    useEffect(

        () => { 

            const auth = authenticateUser()

            if (auth !== true) {
                localStorage.removeItem("petsJWT")
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
                    start_date: data.start_date ? displayDate(data.start_date) : "",
                    start_time: data.start_time ? displayTime(data.start_time) : "",
                    end_date: data.end_date ? displayDate(data.end_date) : "",
                    end_time: data.end_time? displayTime(data.end_time) : "",
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
        const apiResponse = await updateJob(params.id, params.job_id,formData)
        if (apiResponse.error) {
            setErrors(apiResponse)
        } else {
            navigate(`/users/${params.id}/jobs/${apiResponse.id}`)
        }
    }

  return (
    <div className='edit-job-page'>
        <form className='edit-job-form' onSubmit={handleFormSubmit}>
            <h1>Edit Job</h1>  
            {errors && <h4 className='edit-job-errors'>Server Error: {errors.status} {errors.error}!</h4>}

            <input
                type='text'
                name='title'
                placeholder='Title'
                value={formData.title}
                onChange={handleFormChange}
                autoComplete="off"
                required={true}
            />
            
            <textarea
                type='text'
                name='description'
                placeholder='Details'
                value={formData.description}
                onChange={handleFormChange}
                autoComplete="off"
                required={true}
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
                <input
                    type='text'
                    name='start_date'
                    className='date-input'
                    value={formData.start_date}
                    onChange={handleFormChange}
                />
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
                <input
                type='text'
                className='date-input'
                name='end_date'
                value={formData.end_date}
                onChange={handleFormChange}
                />
    
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
                value="Save Changes"
            />

    </form>
</div>
)
   
}
