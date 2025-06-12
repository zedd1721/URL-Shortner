import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin" element={<SignIn />}/>
      </Routes>
      </div>
    </Router>
  )
}

export default App