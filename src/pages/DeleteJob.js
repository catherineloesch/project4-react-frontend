import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { useNavigate, useParams } from "react-router-dom";
import './pages.css'
import CardContent from '../components/CardContent'


export default function DeleteJob() {
    const { API_URL } = useContext(LoginContext);
    const params = useParams()
    const token = JSON.parse(localStorage.getItem('petsJWT')) 
    const navigate = useNavigate();
    const [job, setJob] = useState({})

    async function fetchJob() {
        return fetch(API_URL + `/users/${params.id}/jobs/${params.job_id}`)
    }

    useEffect(
        () => { fetchJob(params.id,params.job_id)
        .then(results => results.json())
        .then(data => {
            setJob(data)
        })
    }, [params.id, params.job_id])

    async function deleteJob(user_id, job_id, token) {
        const url = API_URL + `/users/${user_id}/jobs/${job_id}`
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.token
            }
        }
        const response = await fetch(url, fetchOptions);
        
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    
        return response.json();
    }
  

 

    async function handleDelete (e) {
        const deletedJob = await deleteJob(params.id, params.job_id, token)
        console.log(deletedJob)
        if (!deletedJob.errors) {
            navigate(`/users/${params.id}/jobs`)
        }
    }

    const handleCancel = () => (navigate(`/users/${params.id}/jobs`))

   



  return (
    <div className='new-job-page'>
    <h1>Are you sure you want to delete the following job:</h1>
        <button className='btn' onClick={handleDelete}>Yes, delete</button>
        <button className='btn' onClick={handleCancel}>Cancel</button>
    <CardContent job={job} />
   
    </div>
  )
}
