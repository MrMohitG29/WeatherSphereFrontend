import './App.css';
import NavBar from './Components/NavBar';
import WeatherDashboard from './Components/WeatherDashboard';
import { AppProvider } from './Components/AppContext';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

export default function App() {
  return (
    <AppProvider>
      <>
        <NavBar title="WeatherSphere" />
        <Routes>
        <Route path='Login' element={
             <Login/>
          } />
         <Route path='' element={
             <WeatherDashboard/>
          } />
        </Routes>
      </>
    </AppProvider>
  );
}