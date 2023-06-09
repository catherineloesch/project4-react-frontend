
import React from 'react'
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { pawIconR, pawIconL } from './../assets/icons';
import { authenticateUser } from './../api/user_api'

import "./Card.css"

export default function JobData(props) {
   
    const { setUserLoggedIn } = useContext(LoginContext);
    const navigate = useNavigate();
   

    useEffect(
        () => {
          const auth = authenticateUser()
    
          if (auth === true) {
              console.log('User authenticated:', auth)
              setUserLoggedIn(true)
          }
          
        }
        , [])

    const handleClick = () => {
            navigate(`/users/${props.job.user_id}/jobs/${props.job.id}`)
        }

    //date formatting
    const displayDate = (d) => {
     
      const day = (parseInt(d.slice(8, 10))+1) <10 ? "0" + (parseInt(d.slice(8, 10))+1) : (parseInt(d.slice(8, 10))+1)
     
      const month= d.slice(5, 7)
      const year = d.slice(0, 4)
        return `${day}/${month}/${year}`
    }
    const displayCreatedDate = (d) => {
      // time zone issue, db doesn't have same time zone as react app

      if(d) {
        const day = d[8] + d[9]
        const month = d[5] + d[6]
        const year = d[0] + d[1] + d[2] + d[3]

        return `${day}/${month}/${year}`
      } else {
        return false
      }
      
    }

    //time formatting
    const displayTime = (t) => {
        return `${t.slice(11, 13)}:${t.slice(14, 16)}`
    }

  //title element
  const jobTitle = ( <h2 onClick={handleClick} ><i className={pawIconL.className}></i>{props.job.title}<i className={pawIconR.className}></i></h2>)
 

  return (
    <div className='card-data'> 
      <div className='card-data' onClick={handleClick}></div>
        {jobTitle}
      
        <div className='job-details'>
        <p className='job-description'>{props.job.description}</p>
      
        {props.job.location && <p>Location: {props.job.location}</p>}
        {props.job.pay && <p>Pay: {props.job.pay}</p>}
        {props.job.job_type && <p>Type: {props.job.job_type}</p>}


        {props.job.start_date && <p>Start date: {displayDate(props.job.start_date)}</p>}

        {props.job.start_time && <p>Start time: {displayTime(props.job.start_time)}</p>}

        {props.job.end_date && <p>End date: {displayDate(props.job.end_date)}</p>}
        {props.job.end_time && <p>End time: {displayTime(props.job.end_time)}</p>}

        {displayCreatedDate(props.job.created_at) && <p> posted: {(displayCreatedDate(props.job.created_at))}</p>}

        {props.name && <p>by: <Link to={`/users/${props.job.user_id}/profile`}>{props.name}</Link></p>}
      
        </div>
 
    </div>
  )
}
