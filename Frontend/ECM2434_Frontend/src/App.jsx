import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./contexts/userContext";

function App() {
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState(null);

  return (
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
  );
}

export default App;
