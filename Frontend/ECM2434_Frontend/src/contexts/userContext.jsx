import { createContext,useContext,useEffect,useState } from "react";
import ApiClient from "../api/index";
import { useCookies } from 'react-cookie';
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
    const [cookies, setCookie] = useCookies(['user'])

  useEffect(() => {

        
        if(user){
            //Sets the user to the cookie if it exists
            setCookie('user', user, { path: '/' });

            console.log("Fetching user data")
            console.log("USER: ",user)
            ApiClient.api.fetchUserData(user).then((res) => {
                console.log(res)
                setUserData(res);
                setUserDataLoading(false);
            }).catch((error) => {
                console.log(error);
                setUserDataError(error);
                setUserDataLoading(false);
            });


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