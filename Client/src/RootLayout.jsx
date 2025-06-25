import React from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import { Outlet } from '@tanstack/react-router';

const RootLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet/>
    </>
  )
}

export default RootLayout