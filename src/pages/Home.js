import React from 'react'
import { useEffect, useContext } from 'react';
import { getCurrentUser, authenticateUser } from './../api/user_api'
import { LoginContext } from "../contexts/LoginContext"

import './pages.css'
// import { pawIcon } from './../assets/icons'
import { Link } from 'react-router-dom'



export default function Home(props) {
  const { setCurrentUser, setUserLoggedIn  } = useContext(LoginContext);

  const getUser = async() => {
    const apiResponse = await getCurrentUser()
    if (apiResponse !== null && apiResponse !== undefined) {
    setCurrentUser(apiResponse)
    setUserLoggedIn(true)
    props.setUserId(apiResponse.id)
}}


  useEffect(() => {
    const auth = authenticateUser()
     if (auth === true) {
       getUser()
      }

      }, [])


  return (
    <div className='home'>
    <img src={require('./../assets/images/pitbull_vector.png')} alt=""  className='pitbull-vector-img'  />

      <section>
        <h2> Welcome to Pawnee Pets!</h2>
       
        <h4>Pet care in a trusted community of animal lovers.</h4>
        <h4>Connect pet owners with reliable freelance sitters and dog walkers who will look after your fur babies with the love, care and attention they need and deserve.</h4>
      
      </section>
        <img src={require('./../assets/images/dog_cat.jpg')} alt="photograph a dog and a cat" className='dog-cat-img'  />


      <section>
        <h2>what kind of freelance jobs can you book on Pawnee Pets? </h2>
        <ul>
          <li>
            <span>Dog walking: </span>
            Your dog gets a walk around your neighborhood. Perfect for busy days and dogs with extra energy to burn.
          </li>

          <li>
            <span>Boarding: </span>
            Your pets stay overnight or longer in your sitter’s home.
          </li>

          <li>
            <span>Pet + House Sitting: </span>
             Your sitter takes care of your pets and your home.
          </li>
          
          <li>
            <span> Doggy Day Care: </span>
            Your dog spends the day at your sitter’s home. Drop them off in the morning and pick up a happy pup in the evening.
          </li>
          
          <li>
            <span>Pet Care: </span>
            Your sitter drops by your home to play with your pets, offer food, and give potty breaks or clean the litter box.
          </li>

        </ul>
    
      </section>

      <section>
        <h2>Support our Friends:</h2>
        <ul>
          <li>
            <Link to='https://www.leapingbunny.org/'> Leaping Bunny </Link>
             Program connecting compassionate consumers to cruelty-free companies under its Corporate Standard of Compassion for Animals.
             Check out their <Link to='https://www.leapingbunny.org/shopping-guide'> compassionate shopping guide</Link> of cruelty-free products.
            
          </li>
          <li>
            <Link to='https://crueltyfreeeurope.org/'> Cruelty free Europe </Link>
            Network of animal protection groups working to bring animal testing to an end across Europe.
             </li>
             <li>
            <Link to='https://worldanimalfoundation.org'> World Animal Foundation </Link>
            WAF is an organization dedicated to promoting animal welfare through education, advocacy, and awareness. 

             </li>

          <li>
            <Link to='https://themayhew.org/'> Mayhew </Link>
             Animal welfare charity working to improve life for dogs, cats and the people around them.
          </li>

          <li>
            <Link to='https://www.battersea.org.uk'> Battersea </Link>
            Animal rescue centre looking after dogs and cats until a suitable owner can be found.
          </li>

          <li>
            <Link to='https://www.cats.org.uk/'> cats.org </Link>
            Initiative rehoming thousands of cats each year, giving many cats another chance in life.
          </li>
        
          <li>
            <Link to='https://www.four-paws.org.uk/'> Four Paws </Link>
            Global animal welfare organisation that rescues animals in need and protects them.
          </li>
            
        
          <li>
            <Link to='https://www.rspca.org.uk/'> RSPA </Link>
            Charity pushing for changes in the law to improve animal welfare and raise standards of care.
            Rescue & rehabilitation of animals, providing them with veterinary care and finding them new homes.
          </li>
        
            <li>
              <Link to='https://www.bluecross.org.uk/'> Blue Cross </Link>
              Rehoming for homeless pets, providing free veterinary treatment trustworthy pet information.

            </li>

            <li>
              <Link to='https://www.pdsa.org.uk/what-we-do'> PDSA  </Link>
              Education of communities and schools to raise awareness on key issues that affect the UK’s pet population and how to prevent illness and suffering.
              Vets and vet nurses treat sick and injured pets whose owners can’t afford the full cost of their veterinary treatment, across 48 Pet Hospitals.

            </li>

            <li>
              <Link to='https://woodgreen.org.uk/'> Woodgreen </Link>
              Initiative providing safe shelter and rehoming rescue pets, finding them a loving home, offering medical treatment and specialist care as well.
            </li>
        
       


        </ul>

        <img src={require('./../assets/images/kittens.jpg')} alt="photograph two kittens" className='kittens-img'  />
        
        <img src={require('./../assets/images/puppy1.jpg')} alt="photograph puppy" className='puppy1-img'  />
        <img src={require('./../assets/images/rabbit.jpg')} alt="" className='rabbit-img'  />
        <img src={require('./../assets/images/puppy2.jpg')} alt="photograph puppy"  className='puppy2-img'  />
        
        <img src={require('./../assets/images/english_cocker_spaniel.jpg')} alt=""  className='ecs-img'  />

        




      </section>
    </div>
  )
}
