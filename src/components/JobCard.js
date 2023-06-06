
import React from 'react'
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { pawIconR, pawIconL, pawIcon } from './../assets/icons';

import "./Card.css"

export default function JobCard(props) {
  const navigate = useNavigate();
  const params = useParams()

  const { currentUser, userLoggedIn } = useContext(LoginContext);

  const handleDelete = () => {
    if (userLoggedIn && currentUser.id == props.job.user_id) {
        navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/delete`)
    }
}
console.log(userLoggedIn)
const handleEdit = () => {
    if (userLoggedIn && currentUser.id == props.job.user_id)
    navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/edit`)
}
  
  const jobTitle = ( <h2><i className={pawIconL.className}></i>{props.job.title}<i className={pawIconR.className}></i></h2>)

  let buttons;

  if (userLoggedIn && currentUser) {
    if (currentUser.id == props.job.user_id) {
    buttons = <div> <button className='btn btn-delete-job' onClick={handleDelete}>delete</button>
        <button className='btn btn-edit-job' onClick={handleEdit}>edit</button></div>
  } else {
    buttons = <button className='btn btn-apply'>Apply</button>
  }}

  return (
    <div>
    {
      params.job_id ? jobTitle : <Link to={`/users/${props.job.user_id}/jobs/${props.job.id}`}>{jobTitle}</Link>
    }
        <p>details: {props.job.description}</p>
        {props.job.location && <p>location: {props.job.location}</p>}
        {props.job.pay && <p>pay: {props.job.pay}</p>}
        {props.job.job_type && <p>type: {props.job.job_type}</p>}
        {props.job.start_date && <p>start date: {props.job.start_date}</p>}
        {props.job.start_time && <p>start time: {props.job.start_time}</p>}
        {props.job.end_date && <p>end date: {props.job.end_date}</p>}
        {props.job.end_time && <p>end time: {props.job.end_time}</p>}
        <p>job posted: {props.job.created_at}</p>

        <div>{buttons}</div>
    </div>
  )
}
