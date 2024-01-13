import { createContext, useEffect, useState } from "react";
import { userService } from "../server/systemUserServer";

export const userContext = createContext({});

export const UserProvider = ({children} : any) => {

    const [user, setUser] = useState();

    useEffect(()=> {
        const token = localStorage.getItem('token');
        if(token)
            getUser();
    }, [window])

    const getUser = async () => {
        const res = await userService.get();
        if(res)
            setUser(res);
        else{
            localStorage.removeItem("token")
            localStorage.removeItem("role")
        }
    }
    
    const values = {
        user, 
        getUser,
        setUser
    }

    return <userContext.Provider value={values}>{children}</userContext.Provider>

}