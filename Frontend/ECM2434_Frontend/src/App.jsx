import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DailyQuestPage from "./pages/DailyQuestPage";
import Submissions from "./pages/Submissions";
import { UserContextProvider } from "./contexts/userContext";
import { useUser } from "./contexts/userContext";
import { CookiesProvider, useCookies } from "react-cookie";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
function App() {


  return (
    <CookiesProvider>
      <UserContextProvider>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dailyQuest" element={<DailyQuestPage />} />
            <Route path="/submissions" element={<Submissions />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </>
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default App;
