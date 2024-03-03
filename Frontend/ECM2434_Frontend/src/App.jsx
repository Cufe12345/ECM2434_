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
import EditProfile from "./pages/Edit";
import { useUser } from "./contexts/userContext";
import { CookiesProvider, useCookies } from "react-cookie";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Code_Conduct from "./pages/Code_Conduct";
import Security from "./pages/Security";
import { Footer } from "./components/footer";
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
            <Route path="/dailyQuest" element={<DailyQuestPage />} />
            <Route path="/submissions" element={<Submissions />} />
            <Route path="/code_conduct" element={<Code_Conduct />} />
            <Route path="/security" element={<Security />} />
             <Route path="/profile/edit" element={<EditProfile />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
          <Footer/>
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default App;
