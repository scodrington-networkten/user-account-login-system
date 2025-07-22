import {createContext, useState, useContext, useEffect} from 'react';

const SharedStateContext = createContext();
import {useLocation} from 'react-router-dom';

export const SharedStateProvider = ({children}) => {
    const [miniSearchFormOpen, setMiniSearchFormOpen] = useState(false);
    const [genreSubnavOpen, setGenreSubnavOpen] = useState(false);
    const location = useLocation();

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

    /**
     * On page load, ensure the genre subnav is closed, this ensures as the user navigates around, we
     * close our subnav if it was opened
     */
    useEffect(() => {
        closeGenreSubnav();
    }, [location.pathname, location.search])

    /**
     * On initial load, check if #search exists and open the mini search form (in case users
     * bookmarked or shared that url)
     */
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
