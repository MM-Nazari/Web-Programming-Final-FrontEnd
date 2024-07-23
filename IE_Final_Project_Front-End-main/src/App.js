import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import EntrancePage from './components/EntrancePage/EntrancePage.js';
import SignUpPage from './components/SignUpPage/SignUpPage.js';
import SignInPage from './components/SignInPage/SignInPage.js';
import MainPage from "./components/MainPage/MainPage.js";
import ProfilePage from "./components/ProfilePage/ProfilePage.js"

function App() {
  return (
     <Router>
      <Routes>
        <Route exact path="/" element={<EntrancePage/>} />
        <Route path="/signin" element={<SignInPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
      <Outlet/>
    </Router>
  );
}

export default App;
