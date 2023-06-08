import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { useNavigate, useParams } from "react-router-dom";
import './pages.css'
import JobCard from '../components/JobCard'
import { authenticateUser } from './../api/user_api'
import { deleteJob } from './../api/job_api';


export default function DeleteJob() {
    const { setCurrentUser, setUserLoggedIn } = useContext(LoginContext);

    const { API_URL } = useContext(LoginContext);
    const params = useParams()
    const navigate = useNavigate();
    const [job, setJob] = useState({})

    async function fetchJob() {
        return fetch(API_URL + `/users/${params.id}/jobs/${params.job_id}`)
    }


    useEffect(

        () => { 
            console.log('useffect running inside deletejob')

            const auth = authenticateUser()

            if (auth !== true) {
                localStorage.removeItem("petsJWT")
                setUserLoggedIn(false)
                setCurrentUser(null)
                navigate(`/users/login`)
            }

        fetchJob(params.id,params.job_id)
        .then(results => results.json())
        .then(data => {
            setJob(data)
        })
    }, [params.id, params.job_id])


    const handleCancel = () => {
        navigate(`/users/${params.id}/jobs`)
    }


    async function handleDelete (e) {
        console.log('deleting job.....')
        const deletedJob = await deleteJob(params.id, params.job_id)
        console.log('api response')
        console.log(deletedJob)
        if (!deletedJob.errors) {
            navigate(`/users/${params.id}/jobs`)
        }
    }


  return (
    <div className='new-job-page'>

        <h1>Are you sure you want to delete the following job?</h1>
        <button className='btn' onClick={handleDelete}>Yes, delete</button>
        <button className='btn' onClick={handleCancel}>Cancel</button>
        {<JobCard job={job} />}
       
    </div>
   
  )
}
