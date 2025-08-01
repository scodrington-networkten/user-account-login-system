import MovieCard from "@components/movieCard/movie-card";
import {Movie} from "@contracts/movie";

const SingleMovieCard = () => {

    let movie : Movie = {
        "adult": false,
        "backdrop_path": "/8J6UlIFcU7eZfq9iCLbgc8Auklg.jpg",
        "belongs_to_collection": {
            "id": 1458864,
            "name": "How to Train Your Dragon (Live-Action) Collection",
            "poster_path": null,
            "backdrop_path": "/eKpWn8DwS6xpAKs4eLb4PmrXnhk.jpg"
        },
        "budget": 150000000,
        "genres": [
            {
                "id": 14,
                "name": "Fantasy"
            },
            {
                "id": 10751,
                "name": "Family"
            },
            {
                "id": 28,
                "name": "Action"
            }
        ],
        "homepage": "https://www.welcometoberk.com/",
        "id": 1087192,
        "imdb_id": "tt26743210",
        "origin_country": [
            "US"
        ],
        "original_language": "en",
        "original_title": "How to Train Your Dragon",
        "overview": "On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a feared Night Fury dragon. Their unlikely bond reveals the true nature of dragons, challenging the very foundations of Viking society.",
        "popularity": 663.8759,
        "poster_path": "/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg",
        "production_companies": [
            {
                "id": 521,
                "logo_path": "/kP7t6RwGz2AvvTkvnI1uteEwHet.png",
                "name": "DreamWorks Animation",
                "origin_country": "US"
            },
            {
                "id": 2527,
                "logo_path": "/mNSqvPrlkAcdQlEZ3Ttmx75Z8Xw.png",
                "name": "Marc Platt Productions",
                "origin_country": "US"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "2025-06-06",
        "revenue": 607560730,
        "runtime": 125,
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            },
            {
                "english_name": "Russian",
                "iso_639_1": "ru",
                "name": "Pусский"
            }
        ],
        "status": "Released",
        "tagline": "The legend is real.",
        "title": "How to Train Your Dragon",
        "video": false,
        "vote_average": 8.065,
        "vote_count": 1375
    } as Movie;


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <MovieCard movie={movie}/>
        </div>

    )
}
export default SingleMovieCard;
