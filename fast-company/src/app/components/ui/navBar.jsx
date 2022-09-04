import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const navigate = [
        { id: 1, label: "Главная", link: "/" },
        { id: 2, label: "Вход/Регистрация", link: "/login" },
        { id: 3, label: "Пользователи", link: "/users" }
    ];
    return (
        <ul className="nav nav-tabs">
            {navigate.map((nav) => (
                <li key={nav.id} className="nav-item">
                    <Link className="nav-link" to={nav.link}>
                        {nav.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavBar;
