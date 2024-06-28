import { createContext,useState } from "react";

export const AppContext=createContext();
export default function AppContextProvider({children}){
    const[isLoggedIn, setIsLoggedIn]=useState(false);
    const[loggedUser, setLoggedUser]=useState(null);
    const[refreshPage, setRefreshPage] = useState(false);

   function postCal(loggedUser){
    console.log("POST CAL CALLED")
       return loggedUser.postsArray.length;
   }
    let value={isLoggedIn,setIsLoggedIn,loggedUser,setLoggedUser,refreshPage,setRefreshPage,postCal}
 return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
   )
}