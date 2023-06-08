
import React, { useState, useEffect } from 'react'
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { pawIconR, pawIconL, pawIcon, deleteIcon, editIcon } from './../assets/icons';
import { getUserById } from '../api/user_api';
import { authenticateUser } from './../api/user_api'


import JobData from './JobData';
import "./Card.css"

export default function JobCard(props) {
  const [name, setName] = useState(null)
  const { userLoggedIn, currentUser, setUserLoggedIn } = useContext(LoginContext);

  useEffect(() => {


        const auth = authenticateUser()
  
        if (auth === true) {
            console.log('User authenticated:', auth)
            setUserLoggedIn(true)
        }
      
          getUserById(props.job.user_id)
          .then(res => res.json())
          .then(data => {
            if (data && data.display_name) {
              setName(data.display_name)
              console.log(data.display_name)
            }})

  }, [])
  const navigate = useNavigate();
  const params = useParams()

  // const displayDate = (d) => {
  //   return `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(0, 4)}`
  // }
  // const displayTime = (t) => {
  //   return `${t.slice(11, 13)}:${t.slice(14, 16)}`
  // }


  const handleDelete = () => {
    console.log('delete clicked!')
    if (userLoggedIn && currentUser.id == props.job.user_id) {
      console.log(userLoggedIn)
      console.log(props.job.user_id)
      console.log(props.job.id)
        navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/delete`)
    }
}
console.log(userLoggedIn)
const handleEdit = () => {
    if (userLoggedIn && currentUser.id == props.job.user_id)
    navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/edit`)
}
  

  let buttons;

  if (userLoggedIn && currentUser) {
    if (currentUser.id == props.job.user_id) {
    buttons = (
      <div className='card-btn-container'> 

        <button className='btn btn-delete-job' onClick={handleDelete}>
          <i className={deleteIcon.className}></i>
        </button>

        <button className='btn btn-edit-job' onClick={handleEdit}>
          <i className={editIcon.className}></i>
        </button>  

      </div>)

  } else {
    buttons = null
  }}

  return (
    <div className='job-card'>
      {<JobData job={props.job} name={name}/>}
      {buttons}
    </div>
  )
}
