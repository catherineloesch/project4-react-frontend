import React from 'react'
import { useEffect, useContext } from 'react';
import { getCurrentUser, authenticateUser } from './../api/user_api'
import { LoginContext } from "../contexts/LoginContext"
import { boneIcon, catIcon, dogIcon, homeIcon, pawIcon } from '../assets/icons';
import './pages.css'

// import { pawIcon } from './../assets/icons'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero';



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
      <Hero />
      <section className='home-about-us'>
        <h2>What kind of freelance jobs can you book on Pawnee Pets? </h2>
        <ul>
          <li>
            <span><i className={dogIcon.className}></i>&nbsp;&nbsp;Dog walking </span>
            Your dog gets a walk around your neighborhood. Perfect for busy days and dogs with extra energy to burn.
          </li>

          <li>
            <span><i className={homeIcon.className}></i>&nbsp;&nbsp;Boarding </span>
            Your pets stay overnight or longer in your sitter’s home.
          </li>

          <li>
            <span><i className={catIcon.className}></i>&nbsp;&nbsp;Pet + House Sitting </span>
             Your sitter takes care of your pets and your home.
          </li>
          
          <li>
            <span> <i className={boneIcon.className}></i>&nbsp;&nbsp;Doggy Day Care </span>
            Your dog spends the day at your sitter’s home. Drop them off in the morning and pick up a happy pup in the evening.
          </li>
          
          <li>
            <span><i className={pawIcon.className}></i>&nbsp;&nbsp;Pet Care </span>
            Your sitter drops by your home to play with your pets, offer food, and give potty breaks or clean the litter box.
          </li>

        </ul>
    
      </section>

      <section className='img-section-center'>
        <img src={require('./../assets/images/dog_cat_2.jpg')} alt="photograph of cat with dog"  className='dog-cat-img-2' />
      </section>

      <section className='home-links'>
        <h2>Support our Friends:</h2>
        <ul>
          <li>
            <Link to='https://www.leapingbunny.org/'> <span>{'> Leaping Bunny'}</span> </Link>
            Program connecting compassionate consumers to cruelty-free companies under its Corporate Standard of Compassion for Animals.
            Check out their <Link className='bunny-link' to='https://www.leapingbunny.org/shopping-guide'> compassionate shopping guide</Link> of cruelty-free products.
          </li>

          <li>
            <Link to='https://crueltyfreeeurope.org/'><span>{'> Cruelty free Europe'}</span></Link>
            Network of animal protection groups working to bring animal testing to an end across Europe.
          </li>

          <li>
            <Link to='https://worldanimalfoundation.org'><span> {'> World Animal Foundation'} </span></Link>
              WAF is an organization dedicated to promoting animal welfare through education, advocacy, and awareness. 
          </li>

          <li>
            <Link to='https://themayhew.org/'><span> {'> Mayhew'} </span> </Link>
            Animal welfare charity working to improve life for dogs, cats and the people around them.
          </li>

          <li>
            <Link to='https://www.battersea.org.uk'><span> {'> Battersea'} </span> </Link>
            Animal rescue centre looking after dogs and cats until a suitable owner can be found.
          </li>

          <li>
            <Link to='https://www.cats.org.uk/'><span> {'> cats.org'} </span></Link>
            Initiative rehoming thousands of cats each year, giving many cats another chance in life.
          </li>
        
          <li>
             <Link to='https://www.four-paws.org.uk/'><span> {'> Four Paws'} </span></Link>
            Global animal welfare organisation that rescues animals in need and protects them.
          </li>
            
          <li>
            <Link to='https://www.rspca.org.uk/'><span> {'> RSPA'}</span></Link>
            Charity pushing for changes in the law to improve animal welfare and raise standards of care.
            Rescue & rehabilitation of animals, providing them with veterinary care and finding them new homes.
          </li>
        
          <li>
            <Link to='https://www.bluecross.org.uk/'><span> {'> Blue Cross'}</span> </Link>
            Rehoming for homeless pets, providing free veterinary treatment trustworthy pet information.
          </li>

          <li>
            <Link to='https://www.pdsa.org.uk/what-we-do'><span> {'> PDSA'}</span></Link>
            Education of communities and schools to raise awareness on key issues that affect the UK’s pet population and how to prevent illness and suffering.
            Vets and vet nurses treat sick and injured pets whose owners can’t afford the full cost of their veterinary treatment, across 48 Pet Hospitals.
          </li>

          <li>
            <Link to='https://woodgreen.org.uk/'><span> {'> Woodgreen'}</span> </Link>
            Initiative providing safe shelter and rehoming rescue pets, finding them a loving home, offering medical treatment and specialist care as well.
          </li>

        </ul>

        

        

    </section>
    </div>
  )
}
