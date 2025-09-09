import React, {createContext, useState, useContext, useEffect} from 'react';
import {useLocation} from 'react-router-dom';


type SharedStateContextType = {
    miniSearchFormOpen: boolean,
    setMiniSearchFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    closeMiniSearchForm: () => void,
    openMiniSearchForm: () => void,

    genreSubnavOpen: boolean,
    setGenreSubnavOpen: React.Dispatch<React.SetStateAction<boolean>>,
    openGenreSubnav: () => void,
    closeGenreSubnav: () => void,

    movieListFormOpen: boolean,
    setMovieListFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    openMovieListForm: () => void,
    closeMovieListForm: () => void,
}
const SharedStateContext = createContext<SharedStateContextType | null>(null);


type props = React.PropsWithChildren<{}>;
export const SharedStateProvider = ({children}: props) => {

    const location = useLocation();
    const [miniSearchFormOpen, setMiniSearchFormOpen] = useState(false);
    const [genreSubnavOpen, setGenreSubnavOpen] = useState(false);
    const [movieListFormOpen, setMovieListFormOpen] = useState(false);

    const openMovieListForm = () => {
        setMovieListFormOpen(true);
    }
    const closeMovieListForm = () => {
        setMovieListFormOpen(false);
    }


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
                closeMiniSearchForm,
                setMiniSearchFormOpen,

                genreSubnavOpen,
                setGenreSubnavOpen,
                openGenreSubnav,
                closeGenreSubnav,

                movieListFormOpen,
                openMovieListForm,
                closeMovieListForm,
                setMovieListFormOpen
            }}>
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => {

    const context = useContext(SharedStateContext);
    if(!context){
        throw new Error("useSharedState must be called within a SharedStateProvider");
    }
    return context;
}
