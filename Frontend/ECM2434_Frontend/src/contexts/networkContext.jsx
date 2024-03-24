import { createContext,useContext,useEffect,useState } from "react";
import ApiClient from "../api/index";
import { useCookies } from 'react-cookie';
const NetworkContext = createContext({});

//Created by Cufe12345(Callum Young)

// Custom hook to use the user context
export const useNetwork = () => useContext(NetworkContext);

export function NetworkContextProvider({ children }) {
    //Stores users uid
    // const [ip, setIp] = useState("http://localhost:8000");
    const [ip, setIp] = useState("https://backend.cufe12345.uk");

  return (
    <NetworkContext.Provider value={{ ip,setIp }}>
      {children}
    </NetworkContext.Provider>
  );
}