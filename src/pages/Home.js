import React from 'react'
import './pages.css'
import { pawIcon } from './../assets/icons'
import { Link } from 'react-router-dom'



export default function Home() {
  return (
    <div className='home'>
    <img src={require('./../assets/images/dog_vector.png')} alt=""  className='dog-vector-img'  />
    <img src={require('./../assets/images/dog_cat.jpg')} alt="photograph a dog and a cat" className='dog-cat-img'  />
    <img src={require('./../assets/images/pitbull_vector.png')} alt=""  className='pitbull-vector-img'  />

      <section>
        <h2> Welcome to Pawnee Pets!</h2>
       
        Pet care in a trusted community of animal lovers. <br></br>
        Connect pet owners with reliable freelance sitters and dog walkers who will look after fur babies with the love, care and attention they need and deserve.
      </section>

      <section>
        <h2>what kind of freelance jobs can you book on Pawnee Pets? </h2>
        <ul>
          <li>
            Dog walking: Your dog gets a walk around your neighborhood. Perfect for busy days and dogs with extra energy to burn.
          </li>

          <li>
            Boarding: Your pets stay overnight or longer over holidays in your sitter’s home.
          </li>

          <li>
            Pet + House Sitting: Your sitter takes care of your pets and your home.
          </li>
          
          <li>
            Doggy Day Care: Your dog spends the day at your sitter’s home. Drop them off in the morning and pick up a happy pup in the evening.
          </li>
          
          <li>
            Drop-In Visits: Your sitter drops by your home to play with your pets, offer food, and give potty breaks or clean the litter box.
          </li>

        </ul>
    
      </section>

      <section>
        <h2>Support our Friends:</h2>
        <ul>
          <li>
            <Link to='https://www.leapingbunny.org/'> Leaping Bunny </Link>
             - Program connecting compassionate consumers to cruelty-free companies under its Corporate Standard of Compassion for Animals.
             - Companies must pledge to end animal testing at all stages of product development in addition to recommitting to the program annually and being open to third party audits.
             - Compassionate Shopping Guide: shop cruely-free products:
             - https://www.leapingbunny.org/shopping-guide
             </li>
          <li>
            <Link to='https://crueltyfreeeurope.org/'> Cruelty free Europe </Link>
            We are a network of animal protection groups working to bring animal testing to an end across Europe.


             </li>
             <li>
            <Link to='https://worldanimalfoundation.org'> World Animal Foundation </Link>
            WAF is an organization dedicated to promoting animal welfare through education, advocacy, and awareness. We strive for a world where animals are treated with kindness, compassion, and respect.



             </li>
             <li>
            <Link to='https://www.peta.org.uk/'> People for the Ethical Treatment of Animals </Link>
         Foundation is a UK-based charity dedicated to establishing and protecting the rights of all animals.


             </li>




          <li>
            <Link to='https://themayhew.org/'> Mayhew </Link>
             Animal welfare charity working to improve life for dogs, cats and the people around them.
          </li>

          <li>
            <Link to='https://www.battersea.org.uk'> Battersea </Link>
            - Animal rescue centre looking after dogs and cats until a suitable owner can be found.
          </li>

          <li>
            <Link to='https://www.cats.org.uk/'> cats.org </Link>
            - rehoming thousands of cats each year, giving many cats another chance in life.
          </li>
        
          <li>
            <Link to='https://www.four-paws.org.uk/'> Four Paws </Link>
            - Global animal welfare organisation that rescues animals in need and protects them.
          </li>
            
        
          <li>
            <Link to='https://www.rspca.org.uk/'> RSPA </Link>
            - welfare charity pushing for changes in the law to improve animal welfare and raise standards of care.
            - rescue and rehabilitate animals, providing them with veterinary care and finding them new homes.
          </li>
        
            <li>
              <Link to='https://www.bluecross.org.uk/'> Blue Cross </Link>
              - Rehoming for homeless pets, providing free veterinary treatment trustworthy pet information.

            </li>

            <li>
              <Link to='https://www.pdsa.org.uk/what-we-do'> PDSA  </Link>
              - work with communities and schools to raise awareness and educate the public on key issues that affect the UK’s pet population.prevent illness and suffering
              - Vets and vet nurses treat sick and injured pets whose owners can’t afford the full cost of their veterinary treatment, across 48 Pet Hospitals.

            </li>

            <li>
              <Link to='https://woodgreen.org.uk/'> Woodgreen </Link>
              - offering pet advice for owners + medical treatment and specialist care,
              - provide safe shelter and rehoming rescue pets,find them a loving home where they can live a happy, fulfilling life.
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
