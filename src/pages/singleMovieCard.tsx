import MovieCard from "@components/movieCard/movie-card";
import {Movie} from "@contracts/movie";

const SingleMovieCard = () => {

    let movies: Movie[] = [
        {
            "adult": false,
            "backdrop_path": "/1RgPyOhN4DRs225BGTlHJqCudII.jpg",
            "belongs_to_collection": {
                "id": 925155,
                "name": "Demon Slayer: Kimetsu no Yaiba Collection",
                "poster_path": "/3exjjYTseefny9nYjSbkIblZZdK.jpg",
                "backdrop_path": "/oHx043lHsysn8klll1nPvKMBHLf.jpg"
            },
            "budget": 0,
            "genres": [
                {
                    "id": 16,
                    "name": "Animation"
                },
                {
                    "id": 28,
                    "name": "Action"
                },
                {
                    "id": 14,
                    "name": "Fantasy"
                },
                {
                    "id": 53,
                    "name": "Thriller"
                }
            ],
            "homepage": "https://www.demonslayer-movie.com",
            "id": 1311031,
            "imdb_id": "tt32820897",
            "origin_country": [
                "JP"
            ],
            "original_language": "ja",
            "original_title": "劇場版「鬼滅の刃」無限城編 第一章 猗窩座再来",
            "overview": "As the Demon Slayer Corps members and Hashira engaged in a group strength training program, the Hashira Training, in preparation for the forthcoming battle against the demons, Muzan Kibutsuji appears at the Ubuyashiki Mansion. With the head of the Demon Corps in danger, Tanjiro and the Hashira rush to the headquarters but are plunged into a deep descent to a mysterious space by the hands of Muzan Kibutsuji.  The destination of where Tanjiro and Demon Slayer Corps have fallen is the demons' stronghold – the Infinity Castle. And so, the battleground is set as the final battle between the Demon Slayer Corps and the demons ignites.",
            "popularity": 570.2773,
            "poster_path": "/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg",
            "production_companies": [
                {
                    "id": 5887,
                    "logo_path": "/m6FEqz8rQECnmfjEwjNhNAlmhCJ.png",
                    "name": "ufotable",
                    "origin_country": "JP"
                },
                {
                    "id": 2883,
                    "logo_path": "/rDYExnBV61jGQnkhVVrPN4Yl7O1.png",
                    "name": "Aniplex",
                    "origin_country": "JP"
                },
                {
                    "id": 2918,
                    "logo_path": "/gyEWUBWwqrm3H5T2hkERD9LxpOq.png",
                    "name": "Shueisha",
                    "origin_country": "JP"
                }
            ],
            "production_countries": [
                {
                    "iso_3166_1": "JP",
                    "name": "Japan"
                }
            ],
            "release_date": "2025-07-18",
            "revenue": 87000000,
            "runtime": 155,
            "spoken_languages": [
                {
                    "english_name": "Japanese",
                    "iso_639_1": "ja",
                    "name": "日本語"
                }
            ],
            "status": "Released",
            "tagline": "It's time to have some fun.",
            "title": "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
            "video": false,
            "vote_average": 6.99,
            "vote_count": 49
        } as Movie,
        {
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
        } as Movie
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map((item: Movie, index: number) => (
                <MovieCard movie={item}/>
            ))}
        </div>
    )

}
export default SingleMovieCard;
