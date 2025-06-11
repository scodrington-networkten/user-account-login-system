import './App.css'
import './tailwind.css';
import SingleMoviePage from "./pages/SingleMoviePage.jsx";
import SearchResults from "./pages/SearchResults.jsx";

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

import RouteProgressTracker from "./RouteProgressTracker.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Signup from "./pages/signup.jsx";

function App() {

    return (
        <BrowserRouter>
            <GenreProvider>
                <AppLayout>
                    <RouteProgressTracker/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/movies/:genre" element={<MoviesByGenre/>}/>
                        <Route path="/movie/:id" element={<SingleMoviePage/>}/>
                        <Route path="/search" element={<SearchResults/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                    </Routes>
                </AppLayout>
            </GenreProvider>
        </BrowserRouter>

    )
}

export default App
