import React from 'react'
import JobCard from './JobCard'
import "./Card.css"

export default function CardGrid(props) {
    let cardList
    if (props.jobs && props.jobs.length > 0) {
        cardList =  props.jobs.map(job => <JobCard job={job} key={job.id} buttons={null} />)
    } else {
        cardList = <h3>No Job Listings available at this time.</h3>
    }

    
  return (
    <section className='grid-section'>
        <div className='card-grid'>
            <div className='cards'>
                {cardList}
            </div>
        </div>      
    </section>
  )
}
