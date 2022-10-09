import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(false);
    const [currentUser, setUser] = useState({});
    const [error, setErrors] = useState(null);

    async function siginUp({ email, password, ...rest }) {
        const _URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(_URL, {
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
        const _URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(_URL, {
                email,
                password,
                returnSecureToken: true
            });
            if (data.registered) {
                setTokens(data);
                setAuth(data.registered);
            }
        } catch (error) {
            errorCatcher(error);

            const { code, message } = error.response.data.error;

            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Пользователь с таким Email не найден"
                    };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Не верный логин или пароль"
                    };
                    throw errorObject;
                }
                if (message === "USER_DISABLED") {
                    const errorObject = {
                        password:
                            "Ваш аккаунт временно заблокирован администрацией"
                    };
                    throw errorObject;
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
