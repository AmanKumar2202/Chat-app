import React, { useEffect } from 'react'
import {Routes, Route, Navigate} from "react-router-dom"

import { useAuthStore } from './store/useAuthStore.js';
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { Loader } from "lucide-react"
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.js';

const savedTheme = localStorage.getItem("chat-theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

const App = () => {
   const {authUser,checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
   const {theme}=useThemeStore();

  //  console.log(onlineUsers)
   useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

    useEffect(()=>{
      checkAuth();
    }, [checkAuth])
  
    console.log({authUser})
  
    if(isCheckingAuth && !authUser) return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
    // useEffect(() => {
    //   document.documentElement.setAttribute("data-theme", theme); // ✅ apply to <html>
    // }, [theme]);
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
      <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/"/>}/>
      <Route path='/login' element={!authUser ?<LoginPage />: <Navigate to="/"/>}/>
      <Route path='/settings' element={<SettingsPage />}/>
      <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login"/> }/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App