import React from 'react'
import './Hero.css'

export default function Hero() {
  return (
    <div className='home-hero'>

        <img src={require("./../assets/images/dog_cat.jpg")} className='home-hero-img' alt="" />
        <div className='home-hero-text'>
            <h1> Welcome to Pawnee Pets!</h1>
            <h2>Pet care in a trusted community of animal lovers.</h2>
            <h2>Connecting pet owners with reliable freelance sitters and dog walkers.</h2>
        </div>

    </div>
  )
}
