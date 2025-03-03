import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const { actions } = useContext(Context); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/not-found");
        }
    }, [navigate]);

    const handleLogout = () => {
        actions.logout();  
        navigate("/");     
    };
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Bienvenido al panel de control</p>

            <button onClick={handleLogout} className="btn btn-danger">
                Cerrar sesión
            </button>
        </div>
    );
};
