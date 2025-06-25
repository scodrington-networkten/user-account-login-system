import { createContext, useState, useContext } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
    const [miniSearchFormOpen, setMiniSearchFormOpen] = useState(false);

    return (
        <SharedStateContext.Provider value={{ miniSearchFormOpen, setMiniSearchFormOpen }}>
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => useContext(SharedStateContext);
