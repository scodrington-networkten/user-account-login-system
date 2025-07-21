import _ from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkFull, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarFull, faStarHalfAlt as faStarHalf} from '@fortawesome/free-solid-svg-icons';
import {faBookmark as faBookmarkEmpty, faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons';
import {useLocation} from "react-router-dom";
import slugify from "slugify";
import GenreButton from "@components/genre-button.jsx";
import React from "react";


class Utilities {

    /**
     * Round a given value to a step e.g 0.5
     * @param value
     * @param step
     * @returns {number}
     */
    static round(value, step) {
        step || (step = 1.0);
        let inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }

    /**
     * Format the date into something more useful
     *
     * @param dateString - raw datetime string to be converted
     * @param showTime - append the time info such as 12:35PM
     * @returns {string}
     */
    static formatDate = (dateString, showTime = false) => {

        if (_.isEmpty(dateString)) {
            console.log('an empty date string was passed');
            return '';
        }

        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        //factor in time aspects
        let hours = date.getHours();
        const hour = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = (hours >= 12) ? 'PM' : 'AM';
        const timeComponent = showTime ? `${hour}:${minutes}${ampm}` : '';

        return `${day}/${month}/${year} ${timeComponent}`;

    }

    /**
     * Given two dates, return the number of hours between them
     * @param date1
     * @param date2
     * @returns {number}
     */
    static getDateDifferenceHours(date1, date2) {

        const difference = (new Date(date2)).getTime() - (new Date(date1)).getTime();
        return difference / (1000 * 60 * 60);
    }

    /**
     * gets the rating section, showing the movie score out of 5 stars
     *
     * @param voteAverage
     * @returns {JSX.Element}
     */
    static getStarsSection(voteAverage) {

        //convert from a score of 0-10 to 0-5
        let baseScore = (voteAverage / 2);
        //round to the nearest 0.5
        let newScore = Utilities.round(baseScore, 0.5);
        //determine what icons to use
        let iconsArray = this.getStarIcons(newScore);

        return (
            <section className="stars-information">
                {
                    iconsArray.map((item, index) => {
                        return <span className="item text-[var(--color-highlight-primary)]"
                                     key={`star-${index}`}><FontAwesomeIcon icon={item}/></span>
                    })
                }
            </section>
        );
    }

    /**
     * Given a rating out of 5, determine if it should be a full, empty or half star based on its value
     * @param rating
     * @returns {unknown[]}
     */
    static getStarIcons(rating) {

        const result = Array.from({length: 5}, (item, index) => {
            const slot = index + 1;
            if (rating >= slot) {
                return faStarFull;
            } else if (rating >= slot - 0.5) {
                return faStarHalf;
            } else {
                return faStarEmpty;
            }
        });
        return result;
    }

    /**
     * Shows the total number of people giving this a thumbs up
     * @param votes
     * @returns {JSX.Element}
     */
    static getVotesSection(votes) {

        return (
            <section className="vote-information flex gap-2 justify-center">
                <span className="vote-icon text-[var(--color-highlight-primary)]">
                    <FontAwesomeIcon icon={faThumbsUp}/>
                </span>
                <span className="vote-score">
                    {votes}
                </span>

            </section>
        )

    }


    static getTrimmedString(string, maxCharacters = 200) {

        return _.truncate(string, {
            length: maxCharacters
        });

    }

    /**
     * Converts a word such as tv-movie to Tv Movie ensuring proper case
     * @param initalString
     * @returns {string}
     */
    static getProperCaseString(initalString) {
        return _.startCase(_.toLower(initalString));
    }


    /**
     * Given a data (e.g 'GerardButler' and type 'facebook_id'), return the full url to the resource such as 'https://www.facebook.com/GerardButler'
     * @param data - data for the url, appended to the url based on type
     * @param type {"freebase_mid"|"freebase_id"|"imdb_id"|"tvrage_id"|"wikidata_id"|"facebook_id"|"instagram_id"|"tiktok_id"|"twitter_id"|"youtube_id"}
     *
     */
    static getSocialMediaButton(data, type) {

        if (!data || !type) return null;

        const matrix = {
            freebase_mid: {
                url: `https://www.freebase.com${data}`,
                name: 'Freebase'
            },
            freebase_id: {
                url: `https://www.freebase.com${data}`,
                name: 'Freebase'
            },
            imdb_id: {
                url: `https://www.imdb.com/name/${data}`,
                name: 'IMDB'
            },
            tvrage_id: {
                url: `https://www.tvmaze.com/people/${data}`,
                name: 'TvRage'
            },
            wikidata_id: {
                url: `https://www.wikidata.org/wiki/${data}`,
                name: 'Wikidata'
            },
            facebook_id: {
                url: `https://www.facebook.com/${data}`,
                name: 'Facebook'
            },
            instagram_id: {
                url: `https://www.instagram.com/${data}`,
                name: 'Instagram'
            },
            tiktok_id: {
                url: `https://www.tiktok.com/@${data}`,
                name: 'TikTok'
            },
            twitter_id: {
                url: `https://twitter.com/${data}`,
                name: 'Twitter'
            },
            youtube_id: {
                url: `https://www.youtube.com/@${data}`,
                name: 'Youtube'
            }
        };

        const platform = matrix[type];
        if (!platform) return null;

        return (
            <a
                key={type}
                className="social-media-button button"
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {platform.name}
            </a>
        );

    }

    /**
     * Builds a TMDB image URL using the provided image type and size.
     *
     * @param {string} url - The path of the image (e.g., "/abc123.jpg").
     * @param {"backdrop"|"logo"|"poster"|"profile"|"still"} type - The category of the image.
     * @param {string} size - The size of the image (e.g., "w185", "original"). Must be a valid size for the given type.
     * @returns {string} A fully qualified image URL.
     */
    static getApiImageUrl(url, type, size) {

        //defines the values the API expects
        const imagesSizes = {
            backdrop: ["w300", "w780", "w1280", "original"],
            logo: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
            poster: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
            profile: ["w45", "w185", "h632", "original"],
            still: ["w92", "w185", "w300", "original"]
        }

        //verify the type value passed
        if (!imagesSizes.hasOwnProperty(type)) {
            let allowedTypes = Object.keys(imagesSizes).map((item) => {
                return item
            });
            throw new Error(`Invalid type of image supplied: ${type}. Allowed values include: ${allowedTypes}`);
        }

        //verify the size value passed for the given type
        if (!imagesSizes[type].includes(size)) {
            let allowedSizes = imagesSizes[type].map((item) => {
                return item
            });
            throw new Error(`Invalid size of image supplied: ${size}. Allowed values include: ${allowedSizes}`);
        }

        //determine the url
        if (typeof url !== 'string' || url.trim() === '') {

            if (['poster', 'profile'].includes(type)) {
                return '/portrait_default_image.svg';
            } else {
                return '/profile_image_blank.webp';
            }

            throw new Error(`url provided must be non empty and a string`);
        }

        //get the URL based on values
        return `https://image.tmdb.org/t/p/${size}${url}`;

    }

    //Get the title for the page
    static getSiteNameForPage(page) {
        if (page !== '') {
            return `Movie Search - ${page}`;
        } else {
            return `Movie Search`;
        }
    }

    /**
     * Given a genre object (of id,name) return a formatted genre button, linking correctly to the single genre page
     * @param genre
     * @param index
     * @param context
     * @returns {Element}
     */
    static getGenreButton = (genre, index, context = 'genre-button-') => {

        const location = useLocation();
        const pathSegments = location.pathname.split("/").filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];

        let slugifiedGenre = slugify(genre.name, {lower: true});
        let isActive = (lastSegment === slugifiedGenre);

        return <GenreButton key={`${context}${index}`} genre={genre} isActive={isActive}/>
    }

    /**
     * Given a movie id, return either the movie from the cache if we have it, or fetch it from the API directly.
     * Will return the extended details about the movie,containing details
     *
     * @param movieId
     * @returns {Promise<*>}
     */
    static async getMovie(movieId) {

        //get the movie directly from storage cache if applicable
        const cacheStr = sessionStorage.getItem('movie_cache');
        if (cacheStr) {
            const cache = JSON.parse(cacheStr);
            const matchedRecord = cache[movieId];
            if (matchedRecord) return matchedRecord;
        }

        //item not found in cache, use direct fetch

        const response = await fetch(`/api/get`, {
            headers: {
                'x-action': 'get-movie',
                'movie-id': movieId
            }
        });

        if (!response.ok) {
            throw new Error(`There was an error fetching movie: ${movieId}, response: ${response.statusText}`)
        }

        //add data to cache
        const data = await response.json();
        const cache = cacheStr ? JSON.parse(cacheStr) : {};
        const newCache = {...cache, [movieId]: data};
        sessionStorage.setItem('movie_cache', JSON.stringify(newCache));

        //return response
        return data;
    }

    static setUpcomingMoviesCache($movies){
        sessionStorage.setItem('upcoming_movies', JSON.stringify($movies));
    }

    static getUpcomingMoviesCache(){
        const stored = sessionStorage.getItem('upcoming_movies');
        return stored ? JSON.parse(stored) : null;
    }
}

export default Utilities;
