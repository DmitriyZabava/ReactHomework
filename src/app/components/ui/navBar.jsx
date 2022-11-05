import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <nav className="navbar navbar-expand-lg bg-light ">
            <div className="container-fluid nav-tabs">
                <ul className="nav ">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <i className="px-1 bi bi-house" />
                            Главная
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link className="nav-link" to={"/users"}>
                                Пользователи
                            </Link>
                        </li>
                    )}
                </ul>
                <ul className="nav ">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                <i className="px-1 bi bi-box-arrow-in-right" />
                                Вход/Регистрация
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
