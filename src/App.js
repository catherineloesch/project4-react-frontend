import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
    
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/login' element={<Login />} />
        <Route path='/users/signup' element={<SignUp />} />
        <Route path='/users/dashboard' element={<Dashboard />} />
      </Routes>
      
    </div>
  );
}

export default App;
