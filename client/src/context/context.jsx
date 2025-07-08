import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AppContext = createContext();

export const AppProvider = (props) => {

    axios.defaults.withCredentials = true;

 const backendUrl = import.meta.env.VITE_SERVER_URL;

 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [userData, setUserData] = useState(false);
 const [authLoading, setAuthLoading] = useState(true);

 //function to check if user is logged in
 const getAuthStatus = async () => {
    setAuthLoading(true);
    try {
        const {data} = await axios.get(`${backendUrl}/api/is-auth`);
        if(data.message === 'User is authenticated'){
            setIsLoggedIn(true);
            // Fetch user data when authenticated
            await getUserData();
        } else {
            setIsLoggedIn(false);
            setUserData(null);
        }
    } catch (error) {
        if(error.response && error.response.status === 401){
            setIsLoggedIn(false);
            setUserData(null);
            // Don't log this as it's expected behavior for non-authenticated users
        } else {
            console.error('Authentication check error:', error)
            setIsLoggedIn(false);
            setUserData(null);
        }
    } finally {
        setAuthLoading(false);
    }
 }

 //function to fetch user data
 const getUserData = async () => {
    try {
        const {data} = await axios.get(`${backendUrl}/api/user`);
        setUserData(data);
    } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData(null);
    }
 }

 useEffect(() => {
    getAuthStatus();
 }, []);

 const value = {
    isLoggedIn,
    userData,
    backendUrl,
    setUserData,
    setIsLoggedIn,
    getUserData,
    authLoading,
    
 }

 return (
 <AppContext.Provider value={value}>
    {props.children}
 </AppContext.Provider>
 )


}   