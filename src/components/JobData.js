
import React from 'react'
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { pawIconR, pawIconL } from './../assets/icons';
import { authenticateUser } from './../api/user_api'

import "./Card.css"

export default function JobData(props) {

    const { setUserLoggedIn } = useContext(LoginContext);
    const navigate = useNavigate();
    const params = useParams()
    useEffect(
        () => {
          const auth = authenticateUser()
    
          if (auth === true) {
              console.log('User authenticated:', auth)
              setUserLoggedIn(true)
          }
          
        }
        , [])

    
  

    //date formatting
    const displayDate = (d) => {
        return `${parseInt(d.slice(8, 10))+1 }/${d.slice(5, 7)}/${d.slice(0, 4)}`
    }
    

    //time formatting
    const displayTime = (t) => {
        return `${t.slice(11, 13)}:${t.slice(14, 16)}`
    }


  //title element
  const jobTitle = ( <h2><i className={pawIconL.className}></i>{props.job.title}<i className={pawIconR.className}></i></h2>)

  //logic for title display
  const titleDisplay = params.job_id ? jobTitle : <Link to={`/users/${props.job.user_id}/jobs/${props.job.id}`}>{jobTitle}</Link>

 

  return (
    <div> 
        {titleDisplay}
        <p>details: {props.job.description}</p>

        {props.job.location && <p>location: {props.job.location}</p>}
        {props.job.pay && <p>pay: {props.job.pay}</p>}
        {props.job.job_type && <p>type: {props.job.job_type}</p>}
        {props.job.start_date && <p>start date: {displayDate(props.job.start_date)}</p>}
        {props.job.start_time && <p>start time: {displayTime(props.job.start_time)}</p>}
        {props.job.end_date && <p>end date: {displayDate(props.job.end_date)}</p>}
        {props.job.end_time && <p>end time: {displayTime(props.job.end_time)}</p>}
        
        <p>job posted: {displayDate(props.job.created_at)}</p>
    </div>
  )
}
