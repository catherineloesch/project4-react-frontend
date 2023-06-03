
import React from 'react'
import { Link, useParams } from "react-router-dom";

import "./Card.css"

export default function JobCard(props) {
  const params = useParams()

  return (
    <div>
    {params.job_id ? <h3>{props.job.title}</h3> :  <Link to={`/users/${props.job.user_id}/jobs/${props.job.id}`}><h3>{props.job.title}</h3></Link>}
   
    <p>details: {props.job.description}</p>
    {props.job.location && <p>location: {props.job.location}</p>}
    {props.job.pay && <p>pay: {props.job.pay}</p>}
    {props.job.job_type && <p>type: {props.job.job_type}</p>}
    {props.job.start_date && <p>start date: {props.job.start_date}</p>}
    {props.job.start_time && <p>start time: {props.job.start_time}</p>}
    {props.job.end_date && <p>end date: {props.job.end_date}</p>}
    {props.job.end_time && <p>end time: {props.job.end_time}</p>}
    <p>job posted: {props.job.created_at}</p>

    </div>
  )
}
