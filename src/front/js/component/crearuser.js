import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "./login";
import { Navigate } from "react-router-dom";

export const Crearuser = () => {

    const { store, actions } = useContext(Context);

    return (<>
        {store.auth ? <Navigate to="/privado"/> : <Login text="Crear Usuario"/>}
    
    </>)
}