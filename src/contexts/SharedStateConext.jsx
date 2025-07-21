import {createContext, useState, useContext, useEffect} from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({children}) => {
    const [miniSearchFormOpen, setMiniSearchFormOpen] = useState(false);
    const [genreSubnavOpen, setGenreSubnavOpen] = useState(false);

    const openMiniSearchForm = () => {
        setMiniSearchFormOpen(true);
        window.history.replaceState(null, '', '#search');
    }

    const closeMiniSearchForm = () => {
        setMiniSearchFormOpen(false);
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const openGenreSubnav = () => {
        setGenreSubnavOpen(true);
    }

    const closeGenreSubnav = () => {
        setGenreSubnavOpen(false);
    }

    //on load, sync if the hash is in the URL
    useEffect(() => {

        const syncFromHash = () => {
            const isHashOpen = window.location.hash === '#search';
            setMiniSearchFormOpen(isHashOpen);
        }

        window.addEventListener('hashchange', syncFromHash);
        syncFromHash(); // initial check

        return () => {
            window.removeEventListener('hashchange', syncFromHash);
        }

    }, [])


    return (
        <SharedStateContext.Provider
            value={{
                miniSearchFormOpen,
                openMiniSearchForm,
                setMiniSearchFormOpen,
                closeMiniSearchForm,
                genreSubnavOpen,
                setGenreSubnavOpen,
                openGenreSubnav,
                closeGenreSubnav
            }}>
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => useContext(SharedStateContext);
