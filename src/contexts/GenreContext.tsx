import {z} from "zod";
/**
 * Provides access to genre data to be used across the app
 */

import React, {createContext, useContext, useState, useEffect} from "react";
import {Genre} from "../types/genre";
import {GenreSchema, GenreApiResponseSchema} from "../schemas";


type GenreContextType = {
    genres: Genre[]|null,
    setGenres: React.Dispatch<React.SetStateAction<Genre[] | null>>
}
export const GenreContext = createContext<GenreContextType | null>(null);

type props = React.PropsWithChildren<{}>;
export const GenreProvider = ({children}: props) => {

    //list of currently saved genres from session storage
    const [genres, setGenres] = useState<Genre[] | null>(() => {
        const storedGenres = sessionStorage.getItem("genres");
        return storedGenres ? JSON.parse(storedGenres) as Genre[] : null;
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

                    //collect genres from API
                    const json = await response.json();
                    const parsed = GenreApiResponseSchema.safeParse(json);
                    if (!parsed.success) {
                        throw new Error("failed to parse genres from the API");
                    }

                    //set genre data
                    setGenres(parsed.data.genres);
                    sessionStorage.setItem("genres", JSON.stringify(parsed.data.genres));
                } catch (error) {
                    console.error("Failed to fetch genres:", error);
                }
            };

            void fetchGenreData();
        }
    }, []);

    return (
        <GenreContext.Provider value={{genres, setGenres}}>
            {children}
        </GenreContext.Provider>
    )

}
export const useGenre = () => useContext(GenreContext);
