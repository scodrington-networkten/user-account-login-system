import './App.css'
import './tailwind.css';
import SingleMoviePage from "./pages/SingleMoviePage";
import SearchResults from "./pages/SearchResults";

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

import Signup from "./pages/signup";
import Login from "./pages/login";
import Logout from "./pages/logout";
import {UserProvider} from "@contexts/UserContext";
import UserExpiredPopup from "@components/userExpiredPopup/user-expired-popup";

//user dashboard pages
import Dashboard from "./pages/dashboard/dashboard";
import WatchLater from "./pages/dashboard/watchLater";
import Favorites from "./pages/dashboard/favorites";
import ToastNotification from "@components/toastNotiification/toastNotification";
import MoviesByKeyword from "./pages/MoviesByKeyword";
import DynamicCarousel from "@components/dynamicCarousel/DynamicCarousel";

// @ts-ignore
import SampleData from "./sampleData.js";
import Test from "./pages/test";
import SinglePerson from "./pages/SinglePerson/SinglePerson";
import UpcomingMovies from "./pages/UpcomingMovies";
import PopularMovies from "./pages/PopularMovies/PopularMovies";
import LatestMovies from "./pages/LatestMovies/LatestMovies";
import {SharedStateProvider} from "@contexts/SharedStateConext.jsx";
import NewSlider from "./pages/new-slider";
import NotFound from "./pages/NotFound";
import SingleMovieCard from "./pages/singleMovieCard";

function App() {


    return (

        <BrowserRouter>
            <div className="relative">
                <SharedStateProvider>
                    <UserProvider>
                        <GenreProvider>
                            <RouteProgressTracker/>
                            <Routes>
                                <Route element={<AppLayout contextOffset={true} layoutType={"homepage"}/>}>
                                    <Route path="/" element={<Home/>}/>
                                </Route>

                                <Route element={<AppLayout contextOffset={false} layoutType={"standard"}/>}>
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

                                    <Route path="/single-movie-card" element={<SingleMovieCard/>}/>
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
