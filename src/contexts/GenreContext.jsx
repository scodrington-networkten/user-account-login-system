/**
 * Provides access to genre data to be used across the app
 */

import {createContext, useContext, useState, useEffect} from "react";

export const GenreContext = createContext();

export const GenreProvider = ({children}) => {

    const [genres, setGenres] = useState(() => {
        const storedGenres = sessionStorage.getItem("genres");
        return storedGenres ? JSON.parse(storedGenres) : null;
    });

    useEffect(() => {
        // Only fetch if genres not already in sessionStorage
        if (genres === null) {
            const fetchGenreData = async () => {
                try {
                    const response = await fetch("/api/get", {
                        headers: {
                            'x-action': 'get-genres'
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
                    }

                    const json = await response.json();
                    setGenres(json.data.genres);
                    sessionStorage.setItem("genres", JSON.stringify(json.data.genres));
                } catch (error) {
                    console.error("Failed to fetch genres:", error);
                }
            };

            fetchGenreData();
        }
    }, []);

    return (
        <GenreContext.Provider value={{genres, setGenres}}>
            {children}
        </GenreContext.Provider>
    )

}

