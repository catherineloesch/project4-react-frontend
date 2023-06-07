import React from 'react'
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { authenticateUser } from './../api/user_api'
import { deleteIcon, editIcon } from './../assets/icons';
import JobData from './JobData'
import "./Card.css"

export default function UserJobCard(props) {
    const navigate = useNavigate();
    const { setCurrentUser, setUserLoggedIn } = useContext(LoginContext);


    const displayDate = (d) => {
      return `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(0, 4)}`
    }
    const displayTime = (t) => {
      return `${t.slice(11, 13)}:${t.slice(14, 16)}`
    }

    const handleEdit = () => {
      const auth = authenticateUser()
      if (auth === true) {
        console.log('User authenticated:', auth)
        navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/edit`)
    } else {
      setUserLoggedIn(false)
      setCurrentUser(null)
      navigate(`/users/login`)
    }}

        
    const handleDelete = () => {
      const auth = authenticateUser()

      if (auth === true) {
          console.log('User authenticated:', auth)
          navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/delete`)
      } else {
        setUserLoggedIn(false)
        setCurrentUser(null)
        navigate(`/users/login`)
      }  
    }

  return (
    <div>
        <JobData job={props.job} />

        <div className='btns-container'>

          <button className='btn btn-delete-job' onClick={handleDelete}>
            <i className={deleteIcon.className}></i>
          </button>

          <button className='btn btn-edit-job' onClick={handleEdit}>
            <i className={editIcon.className}></i>
          </button>

        </div>
      
    </div>
  )
}
