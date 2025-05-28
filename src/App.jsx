import {useEffect, useState} from 'react'

import './App.css'
import './tailwind.css';
import CreateTask from "./components/create-task.jsx";
import GenreList from "./components/genre-list.jsx";
import MovieSearch from "./components/movie-search.jsx";
import SingleMoviePage from "./pages/SingleMoviePage.jsx";

//font family imports for inter
import '@fontsource/inter';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';


import {BrowserRouter, Routes, Route, useParams} from "react-router-dom";

import Home from "./pages/Home";
import MoviesByGenre from "./pages/MoviesByGenre";

import AppLayout from "./AppLayout.jsx";

function App() {
    const [count, setCount] = useState(0)
    const [genres, setGenres] = useState([]);

    /**
     * Collect genre data from our backend API
     * @returns {Promise<void>}
     */
    const setGenreData = async () => {

        const response = await fetch('/api/get-genres');
        const result = await response.json();

        //collect data about genres
        let genreData = result.data.genres.map((item, index) => {

            return {
                name: item.name,
                id: item.id
            }

        });

        setGenres((prevData) => {
            return genreData;
        })
    }

    useEffect(() => {
        setGenreData();
    }, [])


    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/movies/:genre" element={<MoviesByGenre/>}/>
                    <Route path="/movie/:id" element={<SingleMoviePage/>}/>
                </Routes>
            </AppLayout>
        </BrowserRouter>

    )
}

export default App
