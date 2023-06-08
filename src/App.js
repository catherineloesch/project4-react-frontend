import { Routes, Route } from 'react-router-dom';
import { LoginContext } from './contexts/LoginContext';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { API_URL } from './api/api_url';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import DeleteAccount from './pages/DeleteAccount';
import NotificationAccountDeleted from './pages/NotificationAccountDeleted';
import PageNotFound from './pages/PageNotFound';

import Jobs from './pages/Jobs';
import UserJobs from './pages/UserJobs';
import Job from './pages/Job';
import AddNewJob from './pages/AddNewJob';
import EditJob from './pages/EditJob';
import DeleteJob from './pages/DeleteJob';
import EditUser from './pages/EditUser';
import UserProfile from './pages/UserProfile';
import NotificationLogoutSuccessful from './pages/NotificationLogoutSuccessful';

function App() {
  const navigate = useNavigate();
  
  //--------------------------------------------------------------------------
  // Variables shared with child components via useContext
  //--------------------------------------------------------------------------

  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState('false');
  
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  return (
    <div className="App">
      {/* LoginContext variables are accessible in children components */}
      <LoginContext.Provider value={{currentUser, setCurrentUser, userLoggedIn, setUserLoggedIn, API_URL}}>

        <Header userId={userId}/>

        <Routes>

          {/* HOME */}
          {/* Landing page: unprotected route, don't need token to access */}
          <Route path='/' element={<Home setUserId={setUserId}/>} />
        
          {/* USER ROUTES */}
          {/* protected routes: can only be accessed with valid JWT token */}
          <Route path='/users/login' element={<Login />} />
          <Route path='/users/signup' element={<SignUp setUserName={setUserName}/>} />
          <Route path='/users/:id/dashboard' element={<Dashboard userName= {userName} />} />
          <Route path='/users/:id/profile' element={<UserProfile />} />
          <Route path='/users/:id/edit' element={<EditUser />} />


          <Route path='/users/logoutsuccessful' element={<NotificationLogoutSuccessful/>} />
          <Route path='/users/:id/delete' element={<DeleteAccount />} />
          <Route path='/users/accountdeleted' element={<NotificationAccountDeleted />} />

          {/* JOB ROUTES */}
          <Route path='/users/:id/jobs' element={<UserJobs setUserId={setUserId}/>} />
          <Route path='/users/:id/jobs/new' element={<AddNewJob />} />
          <Route path='/users/:id/jobs/:job_id/edit' element={<EditJob />} />
          <Route path='/users/:id/jobs/:job_id/delete' element={<DeleteJob />} />

          <Route path='/jobs' element={<Jobs setUserId={setUserId}/>} />
          <Route path='/users/:id/jobs/:job_id' element={<Job setUserId={setUserId} />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>

      </LoginContext.Provider>
    </div>
  );
}

export default App;