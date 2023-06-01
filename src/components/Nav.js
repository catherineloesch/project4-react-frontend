import React from 'react'
import { Link } from "react-router-dom"


export default function Nav() {
  return (
    <nav>
        <Link to="/"><div>Home</div></Link>
        <Link to="/users/login"><div>Login</div></Link>
        <Link to="/users/signup"><div>Sign Up</div></Link>
        <Link to="/users/dashboard"><div>Dashboard</div></Link>

      
    </nav>
  )
}
