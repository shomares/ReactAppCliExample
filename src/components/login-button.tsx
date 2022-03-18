import { IPublicClientApplication } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { id } from "inversify";
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectUser, USERTOKEN } from "../features/user.slice";
import { loginRequest } from '../infraestructure/msal-config'
import { Nullable } from "../model/nullable";

function handleLogin(instance: IPublicClientApplication) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e)
    });
}



const loginButton: FC = () => {
    const { instance } = useMsal()
    const user = useSelector(selectUser)
    const [time, setTime] = useState<Nullable<number>>(null)
    

    useEffect(() => {
        setTime(setTimeout(() => {
            if(!localStorage.getItem(USERTOKEN)){
                handleLogin(instance)
            }
        }, 2000))

    }, [user]);

    useEffect(()=> ()=> {
        if(time){
            clearTimeout(time)
        }
    }, [])

    return <></>
}

export default loginButton;