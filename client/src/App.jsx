import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './Pages/Dashboard';
import { useAuth } from './contexts/AuthContext';
import AddUser from './Pages/AddUser';
import EditUser from './Pages/EditUser';

const App = () => {

  const {isAuthenticated} = useAuth();
  return (
    <Router>
      <Routes>
        <Route path='/' element={!isAuthenticated ? <Register /> : <Navigate to='/dashboard' />} />
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path='/add' element={<AddUser />} />
        <Route path='edit/:id' element={<EditUser />} />
      </Routes>
    </Router>
  )
}

export default App