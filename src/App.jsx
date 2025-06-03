import './App.css'
import './tailwind.css';
import SingleMoviePage from "./pages/SingleMoviePage.jsx";

//font family imports for inter
import '@fontsource/inter';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';


import {BrowserRouter, Routes, Route, useParams} from "react-router-dom";
import {useState, useEffect} from 'react';

import Home from "./pages/Home";
import MoviesByGenre from "./pages/MoviesByGenre";

import AppLayout from "./AppLayout.jsx";

import {GenreProvider} from "./contexts/GenreContext.jsx";


function App() {

    /*
    //define genres, check for local storage first
    const [genres, setGenres] = useState(() => {

        const storedGenres = sessionStorage.getItem('genres');
        if (storedGenres == null) {
            return [];
        }
        return JSON.parse(storedGenres);
    });


    //collect genre data for use
    useEffect(() => {
        const fetchGenreData = async () => {

            if(genres.length > 0){
                return;
            }

            try {
                let result = await fetch('/api/get-genres');
                if (!result.ok) {
                    throw new Error(`failed to fetch genres. Status: ${result.status} Status Text: ${result.statusText}`);
                }
                let json = await result.json();
                setGenres(json.data.genres);

                //set into local session storage for new time
                sessionStorage.setItem('genres', JSON.stringify(json.data.genres));

            } catch (error) {
                console.error("failed to fetch genres: ", error);
            }
        }
        fetchGenreData();
    }, []);

*/

    return (
        <BrowserRouter>
            <GenreProvider>
                <AppLayout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/movies/:genre" element={<MoviesByGenre/>}/>
                        <Route path="/movie/:id" element={<SingleMoviePage/>}/>
                    </Routes>
                </AppLayout>
            </GenreProvider>
        </BrowserRouter>

    )
}

export default App
