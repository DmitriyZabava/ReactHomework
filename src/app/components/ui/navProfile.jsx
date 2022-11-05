import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";
import Loader from "../common/loader";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    if (!currentUser) return <Loader />;

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2"> {currentUser.name}</div>
                <img
                    src={currentUser.image}
                    alt="img"
                    height={30}
                    className="img responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <ul>
                    <Link
                        className="dropdown-item"
                        to={`/users/${currentUser._id}`}
                    >
                        Профиль
                    </Link>
                    <Link className="dropdown-item" to={`/logout`}>
                        <i className="px-1 bi bi-box-arrow-left" />
                        Выйти
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default NavProfile;
