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

import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Logout from "./pages/logout.jsx";
import {UserProvider} from "./contexts/UserContext.jsx";
import UserExpiredPopup from "./components/userExpiredPopup/user-expired-popup.jsx";

//user dashboard pages
import Dashboard from "./pages/dashboard/dashboard.jsx";
import WatchLater from "./pages/dashboard/watchLater.jsx";
import Favorites from "./pages/dashboard/favorites.jsx";

function App() {

    return (
        <BrowserRouter>
            <div className="relative">
                <UserProvider>
                    <GenreProvider>
                        <AppLayout>
                            <RouteProgressTracker/>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/movies/:genre" element={<MoviesByGenre/>}/>
                                <Route path="/movie/:id" element={<SingleMoviePage/>}/>
                                <Route path="/search" element={<SearchResults/>}/>

                                <Route path="/signup" element={<Signup/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/logout" element={<Logout/>}/>


                                <Route path="/dashboard" element={<Dashboard/>}/>
                                <Route path="/dashboard/watch-later" element={<WatchLater/>}/>
                                <Route path="/dashboard/favorites" element={<Favorites/>}/>

                            </Routes>
                        </AppLayout>
                    </GenreProvider>
                    <UserExpiredPopup/>
                </UserProvider>
            </div>
        </BrowserRouter>

    )
}

export default App
