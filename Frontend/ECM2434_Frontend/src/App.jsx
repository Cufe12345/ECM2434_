import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DailyQuest from "./pages/DailyQuest";
import { UserContextProvider } from "./contexts/userContext";
import EditProfile from "./pages/Edit";
import { useUser } from "./contexts/userContext";
import { CookiesProvider, useCookies } from "react-cookie";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {


  return (
    <CookiesProvider>
      <ToastContainer />
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default App;
