import {createContext, useContext, useEffect, useState, useRef, useCallback} from "react";
import {useNavigate, useLocation} from "react-router-dom";

//this context is a placeholder
const UserContext = createContext({
    user: null,
    userExpired: false,
    setUserExpired: () => {
    },
    login: async () => {
    },
    logout: () => {
    }
})

export const UserProvider = ({children}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [userExpired, setUserExpired] = useState(false);
    const userRef = useRef(user);         // <-- ref to keep latest user
    const userExpiredRef = useRef(userExpired); // <-- ref to keep latest userExpired

    // keep refs in sync
    useEffect(() => {
        userRef.current = user;
    }, [user]);
    useEffect(() => {
        userExpiredRef.current = userExpired;
    }, [userExpired]);

    const getToken = () => {
        return sessionStorage.getItem('jwt');
    }

    const deleteToken = () => {
        sessionStorage.removeItem('jwt');
    }

    // Use useCallback to get fresh state inside the function
    const handleTokenInvalidation = useCallback(async () => {

        //if the current user is null, no point handling token invalidation checks
        if (userRef.current === null) return;

        try {
            const token = getToken();
            const validatedUser = await validate(token);
            setUser(validatedUser.user);
            setUserExpired(false);
        } catch (error) {
            setUser(null);
            setUserExpired(true);
            deleteToken();
        }
    }, []);

    // Interval effect watching userExpired state
    useEffect(() => {
        if (userExpiredRef.current) return;

        const intervalId = setInterval(() => {
            if (document.visibilityState !== "visible") return;
            if (userExpiredRef.current) return; // use ref here for latest value

            handleTokenInvalidation();
        }, 10000);

        return () => clearInterval(intervalId);

    }, [userExpired, handleTokenInvalidation]);

    // Visibility change event listener
    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (document.visibilityState !== "visible") return;
            handleTokenInvalidation();
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);

    }, [handleTokenInvalidation]);

    // On initial load, try and load the user
    useEffect(() => {

        const loadUser = async () => {

            const token = getToken();
            if (!token) return;

            try {
                const validatedUser = await validate(token);
                setUser(validatedUser.user);
                setUserExpired(false);

            } catch (error) {
                console.error(error.message);
                logout();
            }
        }

        loadUser();

    }, []);

    const login = async (token) => {
        sessionStorage.setItem('jwt', token);

        try {
            const validatedUser = await validate(token);
            setUser(validatedUser.user);
            setUserExpired(false);
            navigate("/dashboard");

        } catch (error) {
            throw new Error(error.message);
        }
    }

    const validate = async (token) => {
        if (token === null) {
            throw new Error('Token can not be null');
        }

        const userResponse = await fetch('api/user/validate', {
            headers: {Authorization: `Bearer ${token}`}
        })

        if (!userResponse.ok) {
            throw new Error('Invalid or expired token, can not log user in');
        }

        return await userResponse.json();
    }

    const logout = () => {

        deleteToken();
        setUser(null);
        setUserExpired(false);

        //navigate back to home unless we're on the login page
        if (location.pathname === "/login") {
            navigate("/");
        }

    }

    return (
        <UserContext.Provider value={{user, userExpired, setUserExpired, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
