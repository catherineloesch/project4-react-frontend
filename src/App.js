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

import Jobs from './pages/Jobs';
import UserJobs from './pages/UserJobs';
import Job from './pages/Job';
import AddNewJob from './pages/AddNewJob';
import EditJob from './pages/EditJob';
import DeleteJob from './pages/DeleteJob';

function App() {
  const navigate = useNavigate();
  
  //--------------------------------------------------------------------------
  // Variables shared with child components via useContext
  //--------------------------------------------------------------------------

  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState('false');

  return (
    <div className="App">
      {/* LoginContext variables are accessible in children components */}
      <LoginContext.Provider value={{currentUser, setCurrentUser, userLoggedIn, setUserLoggedIn, API_URL}}>

        <Header />

        <Routes>

          {/* HOME */}
          {/* Landing page: unprotected route, don't need token to access */}
          <Route path='/' element={<Home />} />
        
          {/* USER ROUTES */}
          {/* protected routes: can only be accessed with valid JWT token */}
          <Route path='/users/login' element={<Login />} />
          <Route path='/users/signup' element={<SignUp />} />
          <Route path='/users/:id/dashboard' element={<Dashboard />} />
          <Route path='/users/:id/profile' element={<Dashboard />} />
          <Route path='/users/:id/delete' element={<DeleteAccount />} />
          <Route path='/users/accountdeleted' element={<NotificationAccountDeleted />} />

          {/* JOB ROUTES */}
          {/* protected job routes: need valid JWT token to CREATE / EDIT / DELETE jobs */}
          <Route path='/users/:id/jobs' element={<UserJobs />} />
          <Route path='/users/:id/jobs/new' element={<AddNewJob />} />
          <Route path='/users/:id/jobs/:job_id/edit' element={<EditJob />} />
          <Route path='/users/:id/jobs/:job_id/delete' element={<DeleteJob />} />

          {/* unprotected job routes: don't need token to view jobs (INDEX+SHOW) */}
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/users/:id/jobs/:job_id' element={<Job />} />
      
        </Routes>

      </LoginContext.Provider>
    </div>
  );
}

export default App;