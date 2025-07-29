import {useEffect, useState} from "react";
import ActorProfile from "@components/actorProfile/actorProfile";
import LoadingCardList from "@components/loading-card-list";
import {Movie} from "@contracts/movie";
import {Actor} from "@contracts/actor";

/**
 * Gets a list of the movie actors for display for an associated movie
 * @param movie
 * @returns {JSX.Element}
 */
type MovieActorsProps = {
    movie: Movie
}
export default function movieActors({movie}: MovieActorsProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const [actors, setActors] = useState<Actor[]>([])

    //get information about the actors
    useEffect(() => {

        const getActorInformation = async () => {

            setLoading(true);
            try {
                const apiUrl = `/api/get`;
                const response = await fetch(apiUrl, {
                    headers: {
                        'x-action': 'get-movie-credits',
                        'movie-id': movie.id.toString()
                    }
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`could not fetch credit information from: ${apiUrl}, error: ${errorText}`);
                }

                //collect useful information about actors and return
                const json = await response.json();
                const cast: Actor[] | [] = json.cast;

                const sortedCast = cast.sort((a, b) => {
                    return b.popularity - a.popularity;
                })

                setActors(sortedCast.slice(0, 5));
            } catch (error) {
                console.error('Fetch error:', (error as Error).message);
            }

            setLoading(false);

        }
        void getActorInformation();

    }, [movie.id]);

    if (loading) {
        return (
            <div className="actors-list mt-4">
                <h3 className="section-title">Cast & Crew</h3>
                <LoadingCardList items={4}/>
            </div>
        )
    } else {
        return (
            <div className="actors-list mt-4">
                <h3 className="section-title">Cast & Crew</h3>
                <div className="actors">
                    {actors.map((item, key) => {
                        return <ActorProfile actor={item} key={`actor-profile-${key}`}/>;
                    })}
                </div>
            </div>
        )
    }
}
