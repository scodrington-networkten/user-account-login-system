import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

//this context is a placeholder
const UserContext = createContext({
    user: null,
    login: async () => {
    },
    logout: () => {
    }
})

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    /**
     * Triggered on initial load, collect JWT and log user in if applicable
     */
    useEffect(() => {
        const loginUser = async () => {

            const token = sessionStorage.getItem('jwt');
            if (token != null) {

                try {
                    await login(token);
                } catch (error) {
                    console.error(error.message);
                    logout();
                }

            }
        }

        loginUser();

    }, []);

    /**
     * Given a JWT from the user, validate it and collect the user object if valid
     * @param token the jwt returned from BE associated with current user
     * @returns {Promise<void>}
     */
    const login = async (token) => {

        sessionStorage.setItem('jwt', token);
        const userResponse = await fetch('api/user/validate', {
            headers: {Authorization: `Bearer ${token}`}
        })

        //on failed response, throw error that token cant be used
        if (!userResponse.ok) {
            throw new Error('Invalid or expired token, can not log user in');
        }

        //token is good, await the user
        const data = await userResponse.json();
        setUser(data.user);
        navigate("/dashboard");

    }

    const logout = () => {
        sessionStorage.removeItem('jwt');
        setUser(null);
        navigate("/");
    }


    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}
export const useUser = () => useContext(UserContext);
