import {useEffect, useState} from "react";
import MovieKeyword from "@components/movieKeyword/movie-keyword.jsx";

export default function MovieKeywords({movie}) {

    const [keywords, setKeywords] = useState([])
    const [loading, setLoading] = useState(false);

    //on load, fetch the associated keywords for the movie
    useEffect(() => {

        (async () => {

            setLoading(true);

            const result = await fetch('/api/get', {
                method: 'GET',
                headers: {
                    'x-action': 'get-movie-keywords',
                    'movie-id': movie.id
                }
            });

            if (!result.ok) {
                window.showToastNotification('There was an issue fetching the keywords for this movie', 'error');
                return;
            }

            let data = await result.json();
            setKeywords(data?.keywords ?? []);
            setLoading(false);


        })();

    }, [movie]);


    if (loading) {
        return (
            <section className="movie-keywords">
                <h3 className="text-3xl font-light mb-4">Keywords</h3>
                <p>Loading</p>
            </section>

        )
    } else if (keywords.length === 0) {
        return (
            <section className="movie-keywords">
                <h3 className="text-3xl font-light mb-4">Keywords</h3>
                <p>There are no keywords associated with this movie</p>
            </section>

        )
    } else {
        return (

            <section className="movie-keywords">
                <h3 className="text-3xl font-light mb-4">Keywords</h3>
                <div className="keywords flex flex-wrap gap-1 md:gap-2">
                    {
                        keywords.map((item, index) => {
                            return <MovieKeyword keyword={item} key={`movie-keyword-${index}`}/>
                        })
                    }
                </div>
            </section>


        )
    }


}
