import React, {createContext, useContext, useEffect, useState, useRef, useCallback} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {User} from "@contracts/user";
import {UserActionsApiResult} from "@contracts/userActionsApiResult";

type UserContextType = {
    user: null | User,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    userLoading: boolean,
    userExpired: boolean,
    updateUserInformation: (userData: User) => Promise<{success: boolean, message: string, user: null|User}>,
    setUserExpired: React.Dispatch<React.SetStateAction<boolean>>,
    login: (token: string) => Promise<void>,
    logout: () => void,
    toggleFavoriteMovie: (movieId: number) => Promise<{ success: boolean; message: string }>,
    toggleWatchLaterMovie: (movieId: number) => Promise<{ success: boolean; message: string }>,
}
//this context is a placeholder
const UserContext = createContext<UserContextType | null>(null);

type props = React.PropsWithChildren<{}>
export const UserProvider = ({children}: props) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [userLoading, setUserLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [userExpired, setUserExpired] = useState<boolean>(false);
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
     * @param movieId
     */
    const toggleFavoriteMovie = async (movieId: number) => {

        if (!user) {
            return {
                success: false,
                message: "user is not logged in"
            }
        }

        const isFavorite = user.favorite_movies.some(item => {
            return item.movie_id === movieId;
        })

        const action = isFavorite ? 'remove-favorite' : 'add-favorite';

        const jwt = getToken();
        const response = await fetch('/api/user/actions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
                'x-user-action': action
            },
            body: JSON.stringify({movie_id: movieId}),
        })

        const data: UserActionsApiResult = await response.json();

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

    /**
     * Take in new information from the user (from the edit user form) and update the user itself
     * @param userData
     */
    const updateUserInformation = async (userData: User): Promise<{success: boolean, message: string, user: null|User}> => {

        //submit the updated user data to the endpoint to update the record
        const jwt = getToken();
        const response = await fetch('/api/user/actions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
                'x-user-action': 'update-information'
            },
            body: JSON.stringify(userData),
        })

        if(!response.ok){
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.message || 'Update failed',
                user: null
            };
        }

        const data: UserActionsApiResult = await response.json();

        // Assuming your API returns a 'message' and updated 'user'
        return {
            success: true,
            message: data.message || 'Update successful',
            user: data.user
        };

    }


    /**
     * Toggle the selected movie for the user, either adding or removing it from their watch later list
     * @param movieId
     */
    const toggleWatchLaterMovie = async (movieId: number) => {

        if (!user) {
            return {
                success: false,
                message: "user is not logged in"
            }
        }

        const isOnWatchList = user.watch_later_movies.some(item => {
            return item.movie_id === movieId;
        })

        const action = (isOnWatchList) ? 'remove-watch-later' : 'add-watch-later';

        const jwt = getToken();
        const response = await fetch('/api/user/actions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
                'x-user-action': action
            },
            body: JSON.stringify({movie_id: movieId}),
        })

        const data: UserActionsApiResult = await response.json();

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
        localStorage.removeItem('jwt');
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


    // On initial load, try and load the user
    useEffect(() => {
        (async () => {
            setUserLoading(true);
            const token = getToken();
            if (!token) return;
            try {
                const validatedUser = await validate(token);
                setUser(validatedUser.user);
                setUserExpired(false);
            } catch (error) {
                window.showToastNotification('There was an error automatically logging you in', 'error');
                console.error((error as Error).message);
            } finally {
                setUserLoading(false);
            }
        })();
    }, []);

    /**
     * Given a JWT, try and authenticate the user against the backend and if validated, set user and redirect them
     * to the dashboard
     * @param token - jwt
     */
    const login = async (token: string) => {
        localStorage.setItem('jwt', token);

        try {
            const validatedUser = await validate(token);
            setUser(validatedUser.user);
            setUserExpired(false);
            navigate("/dashboard");

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    const validate = async (token: string | null) => {
        if (token === null) {
            throw new Error('Token can not be null');
        }

        const userResponse = await fetch('/api/user/validate', {
            headers: {Authorization: `Bearer ${token}`}
        })

        if (!userResponse.ok) {
            const data = await userResponse.json();
            throw new Error(data.message);
        }

        return await userResponse.json();
    }


    const logout = () => {
        deleteToken();
        setUser(null);
        setUserExpired(false);
    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                userLoading,
                userExpired,
                updateUserInformation,
                setUserExpired,
                login,
                logout,
                toggleFavoriteMovie,
                toggleWatchLaterMovie
            }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a <UserProvider>")
    }
    return context;
}
