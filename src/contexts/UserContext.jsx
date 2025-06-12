
import {createContext, useContext, useEffect, useState} from "react";


const UserContext = createContext({
    user: null,
    loading: true,
    login: async () => {},
    logout: () => {}
})

export const UserProvider = ({children}) => {

    const [loading, setLoading] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (token) => {

        console.log(`Set jwt token ${token}`);
        sessionStorage.setItem('jwt', token);
        const userResponse = await fetch('api/user/validate', {
            headers: { Authorization: `Bearer ${token}` }
        })

        if(!userResponse.ok){
            throw new Error('Invalid or expired token');
        }

        const data = await userResponse.json();
        setUser(data.user);

        console.log("Ive set the user in state!");
        setLoading(false);

    }

    const logout = () => {
        sessionStorage.removeItem('jwt');
        setUser(null);
    }


    return (
        <UserContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
export const useUser = () => useContext(UserContext);
