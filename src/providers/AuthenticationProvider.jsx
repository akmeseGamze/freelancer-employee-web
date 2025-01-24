import axios from "axios";
import { useContext, createContext, useState, useEffect, useCallback } from "react";
import config from "../constants/config";
const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            if (token) {
                checkIfSignedIn();
            } else {
                setLoaded(true);
            }
        }
    }, [token]);

    const checkIfSignedIn = useCallback(async () => {
        try {
            const response = await axios(config.api + "/api/v1/auth/employee/auto-login", {
                method: "POST",
                data: JSON.stringify({
                    authentication_token: token,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response || !response.data.token) {
                localStorage.removeItem("token");
                setToken(null);
                setLoaded(true);
                return;
            }

            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            setUser(response.data.employee);
            setLoaded(true);
        } catch (e) {
            console.log(e);
        }
    }, [token]);

    const signIn = useCallback(async (email, password) => {
        try {
            const response = await axios(config.api + "/api/v1/auth/employee/login", {
                method: "POST",
                data: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response || !response.data.token) {
                return;
            }

            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            setUser(response.data.employee);
        } catch (e) {
            console.log(e);
        }
    }, []);


    return (
        <AuthenticationContext.Provider
            value={{ user, signIn, token }}
        >
            {loaded && children}
            {!loaded && <div className="fixed bg-base-100 inset-0 flex flex-col items-center justify-center"><span className="loading loading-spinner"></span></div>}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;

export const useAuth = () => {
    return useContext(AuthenticationContext);
};