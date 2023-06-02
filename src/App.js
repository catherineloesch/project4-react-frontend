import { Routes, Route } from 'react-router-dom';
import { LoginContext } from './contexts/LoginContext';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Header from './components/Header';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserJobs from './pages/UserJobs';
import AddNewJob from './pages/AddNewJob';
import Job from './pages/Job';
import EditJob from './pages/EditJob';
import DeleteJob from './pages/DeleteJob';
import DeleteAccount from './pages/DeleteAccount';
import NotificationAccountDeleted from './pages/NotificationAccountDeleted';

function App() {
  const API_URL = "http://project4-rails-api.herokuapp.com"
  const navigate = useNavigate();

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
        setUserLoggedIn(true)
        setCurrentUser(data)
        
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

  
  return (
    <div className="App">
    <LoginContext.Provider value={{currentUser, setCurrentUser, userLoggedIn, setUserLoggedIn, API_URL}}>

      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Jobs />} />

        <Route path='/users/login' element={<Login />} />
        <Route path='/users/signup' element={<SignUp />} />
        <Route path='/users/:id/dashboard' element={<Dashboard />} />
        <Route path='/users/:id/profile' element={<Dashboard />} />
        <Route path='/users/:id/delete' element={<DeleteAccount />} />
        <Route path='/users/accountdeleted' element={<NotificationAccountDeleted />} />


        <Route path='/users/:id/jobs' element={<UserJobs />} />
        <Route path='/users/:id/jobs/new' element={<AddNewJob />} />
        <Route path='/users/:id/jobs/:job_id' element={<Job />} />
        <Route path='/users/:id/jobs/:job_id/edit' element={<EditJob />} />
        <Route path='/users/:id/jobs/:job_id/delete' element={<DeleteJob />} />
      
      </Routes>

      </LoginContext.Provider>
    </div>
  );
}

export default App;
