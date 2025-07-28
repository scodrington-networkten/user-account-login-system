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

//font family support for inter + italic
import '@fontsource/inter/400-italic.css';
import '@fontsource/inter/500-italic.css';
import '@fontsource/inter/700-italic.css';


import {BrowserRouter, Routes, Route, useParams} from "react-router-dom";

import Home from "./pages/Home";
import MoviesByGenre from "./pages/MoviesByGenre";

import AppLayout from "./AppLayout.js";

import {GenreProvider} from "@contexts/GenreContext";

import RouteProgressTracker from "./RouteProgressTracker";

import Signup from "./pages/signup.jsx";
import Login from "./pages/login";
import Logout from "./pages/logout";
import {UserProvider} from "./contexts/UserContext";
import UserExpiredPopup from "./components/userExpiredPopup/user-expired-popup.jsx";

//user dashboard pages
import Dashboard from "./pages/dashboard/dashboard.jsx";
import WatchLater from "./pages/dashboard/watchLater.jsx";
import Favorites from "./pages/dashboard/favorites.jsx";
import ToastNotification from "@components/toastNotiification/toastNotification.jsx";
import MoviesByKeyword from "./pages/MoviesByKeyword..jsx";
import DynamicCarousel from "@components/dynamicCarousel/DynamicCarousel.jsx";

import SampleData from "./sampleData.js";
import Test from "./pages/test.jsx";
import SinglePerson from "./pages/SinglePerson";
import UpcomingMovies from "./pages/UpcomingMovies/Index.jsx";
import PopularMovies from "./pages/PopularMovies/index.jsx";
import LatestMovies from "./pages/LatestMovies/index.jsx";
import {SharedStateProvider} from "@contexts/SharedStateConext.jsx";
import NewSlider from "./pages/new-slider.jsx";
import NotFound from "./pages/NotFound";

function App() {


    return (

        <BrowserRouter>
            <div className="relative">
                <SharedStateProvider>
                    <UserProvider>
                        <GenreProvider>
                            <RouteProgressTracker/>
                            <Routes>
                                <Route element={<AppLayout contextOffset={true}/>}>
                                    <Route path="/" element={<Home/>}/>
                                </Route>

                                <Route element={<AppLayout contextOffset={false}/>}>
                                    <Route path="/movies/:genre" element={<MoviesByGenre/>}/>
                                    <Route path="/movie/:id" element={<SingleMoviePage/>}/>
                                    <Route path="/search" element={<SearchResults/>}/>

                                    <Route path="/signup" element={<Signup/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/logout" element={<Logout/>}/>

                                    <Route path="/keyword/:keyword" element={<MoviesByKeyword/>}/>

                                    <Route path="/dashboard" element={<Dashboard/>}/>
                                    <Route path="/dashboard/watch-later" element={<WatchLater/>}/>
                                    <Route path="/dashboard/favorites" element={<Favorites/>}/>

                                    <Route path="/person/:id/:name" element={<SinglePerson/>}/>


                                    <Route path="/movies/upcoming" element={<UpcomingMovies/>}/>
                                    <Route path="/movies/popular" element={<PopularMovies/>}/>
                                    <Route path="/movies/latest" element={<LatestMovies/>}/>

                                    <Route path="/test"
                                           element={<DynamicCarousel movies={SampleData.results.slice(6 - 14)}/>}/>

                                    <Route path="/new-movie-design" element={<Test/>}/>
                                    <Route path="/new-slider" element={<NewSlider/>}/>

                                    <Route path="*" element={<NotFound/>}/>
                                </Route>
                            </Routes>


                        </GenreProvider>
                        <UserExpiredPopup/>
                        <ToastNotification/>
                    </UserProvider>
                </SharedStateProvider>
            </div>
        </BrowserRouter>

    )
}

export default App
