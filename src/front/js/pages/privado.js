import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Privado = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    function salir () {
        actions.logout();
        navigate("/")
       
    }
	return (
		<>
			{store.auth ? (
					<button
                        onClick={() => salir()}
						style={{
							backgroundColor: "#008CBA",
							color: "white",
							border: "none",
							borderRadius: "10px",
							padding: "10px 20px",
							fontSize: "16px",
							cursor: "pointer",
							transition: "background-color 0.3s ease",
							marginLeft: "5%",
						}}
						onMouseOver={(e) => (e.target.style.backgroundColor = "#007bb5")}
						onMouseOut={(e) => (e.target.style.backgroundColor = "#008CBA")}
					>
						Volver
					</button>
			) : null}
             {store.auth ? null : <Navigate to="/enter"/>}
			<h1>Esto es privado</h1>
		</>
	);
};