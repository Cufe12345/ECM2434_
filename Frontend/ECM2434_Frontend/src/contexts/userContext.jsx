import { createContext,useContext,useEffect,useState } from "react";

const UserContext = createContext({});

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

export function UserContextProvider({ children }) {
    //Stores users uid
    const [user, setUser] = useState(null);

    //Stores users data
    const [userData, setUserData] = useState(null);
    const [userDataLoading, setUserDataLoading] = useState(true);
    const [userDataError, setUserDataError] = useState(null);


  useEffect(() => {
        if(user){
            //Fetch user data
            //setUserData
            //setUserDataLoading
            console.log("Fetching user data")

        }
        else{
            console.log("Cant fetch data, user not logged in")
            setUserDataError("User not logged in");
            setUserDataLoading(false);
        }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser,userData,userDataError,userDataLoading }}>
      {children}
    </UserContext.Provider>
  );
}