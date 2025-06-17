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
    },
    toggleFavoriteMovie: () => {

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


    /**
     * Add or remove a favorite movie from a user, also setting the updated user reference as
     * the associated data has changed
     *
     * @param movieId
     * @returns {Promise<{success: boolean, message}>}
     */
    const toggleFavoriteMovie = async (movieId) => {

        const isFavorite = user.favorite_movies.some(item => {
            return item.movie_id === movieId;
        })

        const action = isFavorite ? 'remove-favorite' : 'add-favorite';

        const jwt = getToken();
        const response = await fetch('api/user/actions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
                'x-user-action': action
            },
            body: JSON.stringify({movie_id: movieId}),
        })

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message
            }
        } else {

            setUser(data.user);

            return {
                success: true,
                message: data.message
            }
        }
    }

    const getToken = () => {
        return localStorage.getItem('jwt');
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

    /**
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

     */

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

    /**
     * Given a JWT, try and authenticate the user against the backend and if validated, set user and redirect them
     * to the dashboard
     * @param token - jwt
     * @returns {Promise<void>}
     */
    const login = async (token) => {
        localStorage.setItem('jwt', token);

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

        navigate("/login");
    }

    return (
        <UserContext.Provider value={{user, userExpired, setUserExpired, login, logout, toggleFavoriteMovie}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
