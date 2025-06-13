import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

//this context is a placeholder
const UserContext = createContext({
    user: null,
    userExpired: false,
    setUserExpired: () => {},
    login: async () => {
    },
    logout: () => {
    }
})

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [userExpired, setUserExpired] = useState(false);
    const navigate = useNavigate();

    const getToken = () => {
        return sessionStorage.getItem('jwt');
    }

    const deleteToken = () => {
        sessionStorage.removeItem('jwt');
    }

    /**
     * Periodically check the users token to ensure validation.
     * Hook into the 'visibilitychange' document event triggered when the website gains/loses focus
     */
    useEffect(() => {

        /**
         * When focusing, check the validity of the JWT just in case
         */
        const handleVisibilityChange = async () => {

            setUserExpired(false);

            //only trigger on focus visible
            if (document.visibilityState !== "visible") return;

            try {
                const token = getToken();
                const validatedUser = await validate(token);
                setUser(validatedUser.user);
            }
                //error in validating the jwt, invalidate the user immediately
            catch (error) {
                setUser(null);
                setUserExpired(true);
                deleteToken();
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return (() => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        });
    }, []);


    /**
     * Triggered on initial load, collect JWT and log user in if applicable
     */
    useEffect(() => {
        const loginUser = async () => {

            const token = getToken();
            try {
                await login(token);
            } catch (error) {
                console.error(error.message);
                logout();
            }
        }

        loginUser();

    }, []);


    /**
     * Given a JWT from the user, validate it and collect the user object, loggin the user in
     *
     * @param token the jwt returned from BE associated with current user
     * @returns {Promise<void>}
     */
    const login = async (token) => {

        sessionStorage.setItem('jwt', token);

        try {
            const validatedUser = await validate(token);
            setUser(validatedUser.user);
            navigate("/dashboard");

        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Ensure the given token is valid against api
     * @param token jwt to check against
     * @returns {Promise<any>}
     */
    const validate = async (token) => {

        if (token === null) {
            throw new Error('Token can not be null');
        }

        const userResponse = await fetch('api/user/validate', {
            headers: {Authorization: `Bearer ${token}`}
        })

        //on failed response, throw error that token cant be used
        if (!userResponse.ok) {
            throw new Error('Invalid or expired token, can not log user in');
        }

        //token is good, await the user
        return await userResponse.json();

    }

    /**
     * Log the user out and redirect them to the homepage
     */
    const logout = () => {
        deleteToken();
        setUser(null);
        navigate("/");
    }

    return (
        <UserContext.Provider value={{user, userExpired, setUserExpired, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}
export const useUser = () => useContext(UserContext);
