import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavBar = () => {
    const { isAuth, setAuth } = useAuth();

    const handleAuthExit = () => setAuth(false);

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className="nav-link" to="/">
                    <i className="px-1 bi bi-house" />
                    Главная
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={isAuth ? "/users" : "/login"}>
                    Пользователи
                </Link>
            </li>
            {isAuth ? (
                <li className="nav-item" onClick={handleAuthExit}>
                    <Link className="nav-link" to="/login">
                        <i className="px-1 bi bi-box-arrow-left" />
                        Выйти
                    </Link>
                </li>
            ) : (
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        <i className="px-1 bi bi-box-arrow-in-right" />
                        Вход/Регистрация
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default NavBar;
