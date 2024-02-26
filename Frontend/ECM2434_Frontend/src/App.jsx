import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DailyQuest from "./pages/DailyQuest";
import { UserContextProvider } from "./contexts/userContext";
import { useUser } from "./contexts/userContext";
import { CookiesProvider, useCookies } from "react-cookie";

function App() {
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState(null);
  return (
    <CookiesProvider>
      <UserContextProvider>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </>
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default App;
