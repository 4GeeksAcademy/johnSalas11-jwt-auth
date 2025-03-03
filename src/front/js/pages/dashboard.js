import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export const Dashboard = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [value, setValue] = useState("");
    const [todo, setTodo] = useState([]);


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

    const enterPush = (e) => {
        if (e.key === "Enter") {
            setTodo((previous) => {
                const newTodo = value;
                const newList = [...previous, newTodo].filter((item) => item);
                return newList;
            });
            setValue("");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h1>ToDo's</h1>
                <input
                    type="text"
                    placeholder="To Be Done"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    onKeyUp={enterPush}
                />
                <ul>
                    {todo.map((item, index) => (
                        <li key={index}>
                            {item}
                            <i
                                onClick={() =>
                                    setTodo((previous) => {
                                        const newList = previous.filter(
                                            (element) => element !== item
                                        );
                                        return newList;
                                    })
                                }
                                className="icon fa-solid fa-x"
                            ></i>
                        </li>
                    ))}
                </ul>
                <div className="tasks-left">{todo.length} tasks left</div>
                <button onClick={handleLogout} className="btn-logout">
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};
