import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './tailwind.css';
import CreateTask from "./components/create-task.jsx";
import GenreList from "./components/genre-list.jsx";
import MovieSearch from "./components/movie-search.jsx";

import {BrowserRouter, Routes, Route, useParams} from "react-router-dom";

import Home from "./pages/Home";
import MoviesByGenre from "./pages/MoviesByGenre";

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

    const fetchData = () => {

        fetch('/api/test')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            })
            .then((data) => {
                let mydata = data.message;
                alert(`the data is: ${mydata}`)
            })
            .catch((error) => {
                alert(error);
            });

    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/movies/:genre" element={<MoviesByGenre/>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default App
