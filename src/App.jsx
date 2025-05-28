import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './tailwind.css';
import CreateTask from "./components/create-task.jsx";
import GenreList from "./components/genre-list.jsx";
import MovieSearch from "./components/movie-search.jsx";
import SingleMovie from "./pages/SingleMovie.jsx";

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
                    <Route path="/movie/:id" element={<SingleMovie/>}/>
                </Routes>
            </AppLayout>
        </BrowserRouter>

    )
}

export default App
