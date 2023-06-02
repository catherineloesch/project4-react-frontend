import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function JobCard(props) {
    

  return (
    <div>
    <Link to={`/users/${props.job.user_id}/jobs/${props.job.id}`}><h3>{props.job.title}</h3></Link>
        

        <p>location: {props.job.location}</p>
        <p>pay: {props.job.pay}</p>
        <p>details: {props.job.description}</p>
        <p>type: {props.job.job_type}</p>
        <p>start date: {props.job.start_date}</p>
        <p>start time: {props.job.start_time}</p>
        <p>end date: {props.job.end_date}</p>
        <p>end time: {props.job.end_time}</p>
        <p>job posted: {props.job.created_at}</p>
    </div>
  )
}
