import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import { LoginContext } from './contexts/LoginContext';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import UserJobs from './pages/UserJobs';
import AddNewJob from './pages/AddNewJob';
import Job from './pages/Job';

function App() {
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState(null);

  let token = JSON.parse(localStorage.getItem('petsJWT'))

  const verifyToken = async (token) => {
    const url = `http://project4-rails-api.herokuapp.com/users/auto_login`
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token 
    }}

    try {
        const response = await fetch(url, fetchOptions);
        const data = await response.json()
        setCurrentUser(data)
        setUserLoggedIn(true)
    } catch(error) {
      setUserLoggedIn(false)
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('petsJWT'))
    if (token) {
    verifyToken(token);
 
    } else {
      setUserLoggedIn(false)
    }    }, []);
  
  const [currentUser, setCurrentUser] = useState(null);

  const [userLoggedIn, setUserLoggedIn] = useState('false');
  // useEffect(() => {
  //   let token = JSON.parse(localStorage.getItem('petsJWT'))
  //   if (token) {} else {
  //     navigate(`/users/login`)

  //   } 
  // }, []);

  
  return (
    <div className="App">
    <LoginContext.Provider value={{currentUser, setCurrentUser, userLoggedIn, setUserLoggedIn}}>

      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/users/:id/jobs/:job_id' element={<Job />} />

        <Route path='/users/login' element={<Login />} />
        <Route path='/users/signup' element={<SignUp />} />

        <Route path='/users/:id/dashboard' element={<Dashboard />} />
        <Route path='/users/:id/jobs' element={<UserJobs />} />
        <Route path='/users/:id/jobs/new' element={<AddNewJob />} />

      
      </Routes>

      </LoginContext.Provider>
    </div>
  );
}

export default App;
