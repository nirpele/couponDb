import { useState } from "react";
import Login from "../LoginUseContext/LoginUseContext";
import {CustomerContext } from '../../contexts/AppContextCustomer';


export default function App(){
    const [loginToken,setLoginToken] = useState('');
    return (
        <CustomerContext.Provider value={{loginToken, setLoginToken}}>
                <Login />
        </CustomerContext.Provider>
        )
}       