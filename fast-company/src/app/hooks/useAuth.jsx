import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(false);
    const [currentUser, setUser] = useState({});
    const [error, setErrors] = useState(null);

    async function siginUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp?`, {
                email,
                password,
                returnSecureToken: true
            });

            setTokens(data);

            await createUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function siginIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword?`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            if (data.registered) {
                setTokens(data);
                setAuth(data.registered);
            }
        } catch (error) {
            errorCatcher(error);

            const { code, message } = error.response.data.error;

            if (code === 400) {
                switch (message) {
                    case "EMAIL_NOT_FOUND":
                        throw new Error("Не верный логин или пароль");
                    case "INVALID_PASSWORD":
                        throw new Error("Не верный логин или пароль");
                    case "USER_DISABLED":
                        throw new Error(
                            "Ваш аккаунт временно заблокирован администрацией"
                        );
                    default:
                        throw new Error(
                            "Слишком много попыток входа ! Попробуйте позднее ."
                        );
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setErrors(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast.warning(error);
            setErrors(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider
            value={{ siginUp, currentUser, siginIn, isAuth, setAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
