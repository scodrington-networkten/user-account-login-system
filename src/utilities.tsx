import _ from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkFull, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarFull, faStarHalfAlt as faStarHalf} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarEmpty, IconDefinition} from '@fortawesome/free-regular-svg-icons';
import React, {JSX} from "react";
import GenreButtonWrapper from "@components/genreButtonWrapper";
import {Genre} from "@contracts/genre";
import {MovieResult} from "@contracts/movieResult";
import he from "he";
import {Keyword} from "@contracts/keyword";
import slugify from "slugify";

export type SocialMediaType =
    | "freebase_mid"
    | "freebase_id"
    | "imdb_id"
    | "tvrage_id"
    | "wikidata_id"
    | "facebook_id"
    | "instagram_id"
    | "tiktok_id"
    | "twitter_id"
    | "youtube_id";

export type SocialMediaInfo = {
    url: string;
    name: string;
}

type ApiImageBackdropSizes = "w300" | "w780" | "w1280" | "original";
type ApiImageLogoSizes = "w45" | "w92" | "w154" | "w185" | "w300" | "w500" | "original";
type ApiImagePosterSizes = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";
type ApiImageProfileSizes = "w45" | "w185" | "h632" | "original";
type ApiImageStillSizes = "w92" | "w185" | "w300" | "original"
type ApiImageOptions =
    | { type: "backdrop"; size: ApiImageBackdropSizes }
    | { type: "logo"; size: ApiImageLogoSizes }
    | { type: "poster"; size: ApiImagePosterSizes }
    | { type: "profile"; size: ApiImageProfileSizes }
    | { type: "still"; size: ApiImageStillSizes };


class Utilities {

    /**
     * Given a genre or keyword, return the correct name in a slugified format to be used for URLS
     * @param item
     */
    static getSlugifiedGenreOrKeywordName(item: Genre | Keyword): string {
        return slugify(item.name, {lower: true, strict: true});
    }

    /**
     * Converts a biography string with HTML entities and line breaks
     * into safe HTML with real paragraphs and <br /> tags.
     * @param {string} raw
     * @returns {string} HTML
     */
    static formatString(raw: string): string {

        const decoded = he.decode(raw || '');

        // Split by double line breaks (paragraphs)
        const paragraphs = decoded.split(/\n{2,}/g).map(p =>
            `<p>${p.trim().replace(/\n/g, '<br />')}</p>`
        );

        return paragraphs.join('');
    }


    /**
     * use lodash to generate a random string
     * @param length
     * @returns {string}
     */
    static generateRandomString = (length = 10) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return _.times(length, () => _.sample(chars)).join('');
    };


    /**
     *
     * @param value - value to round
     * @param step - the step to round to e.g. 0.5
     * @returns {number}
     */
    static round(value: number, step: number): number {
        step || (step = 1.0);
        let inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }

    /**
     * Format the date into something more useful
     *
     * @param dateString {string} - raw datetime string to be converted
     * @param showTime {boolean} - append the time info such as 12:35PM
     * @returns {string}
     * @returns
     */
    static formatDate = (dateString: string, showTime: boolean = false): string => {

        if (_.isEmpty(dateString)) {
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
     * @param date1 {string|null}
     * @param date2 {string|null}
     * @returns {number|null}
     */
    static getDateDifferenceHours(date1: string | null, date2: string | null): number | null {
        //if dates are empty, return null
        if (!date1 || !date2) return null;

        const difference = (new Date(date2)).getTime() - (new Date(date1)).getTime();
        return difference / (1000 * 60 * 60);
    }


    /**
     * Given the vote-average number (out of 10), convert it to a 5 star rating component
     * @param voteAverage {number}
     * @return JSX.Element
     */
    static getStarsSection(voteAverage: number): JSX.Element {

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
     * @param rating {number}
     * @returns {IconDefinition[]}
     */
    static getStarIcons(rating: number): IconDefinition[] {

        return Array.from({length: 5}, (item, index) => {
            const slot = index + 1;
            if (rating >= slot) {
                return faStarFull;
            } else if (rating >= slot - 0.5) {
                return faStarHalf;
            } else {
                return faStarEmpty;
            }
        });

    }

    /**
     * Shows the total number of people giving this movie a thumbs up
     *
     * @param votes {number}
     * @returns {JSX.Element}
     */
    static getVotesSection(votes: number): JSX.Element {

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


    /**
     * Given an input string, return a truncated version to a set length
     * @param inputString {string}
     * @param maxCharacters {number}
     * @returns {string}
     */
    static getTrimmedString(inputString: string, maxCharacters: number = 200): string {
        return _.truncate(inputString, {
            length: maxCharacters
        });
    }

    /**
     * Converts a word such as tv-movie to Tv Movie ensuring proper case
     * @param initialString {string}
     * @returns {string}
     */
    static getProperCaseString(initialString: string): string {
        return _.startCase(_.toLower(initialString));
    }


    /**
     * Given a data (e.g 'GerardButler' and type 'facebook_id'), return the full url to the resource such as 'https://www.facebook.com/GerardButler'
     * @param data - data for the url, appended to the url based on type
     * @param type {"freebase_mid"|"freebase_id"|"imdb_id"|"tvrage_id"|"wikidata_id"|"facebook_id"|"instagram_id"|"tiktok_id"|"twitter_id"|"youtube_id"}
     *
     */

    static getSocialMediaButton(data: string | null, type: SocialMediaType | null): JSX.Element | null {

        if (!data || !type) return null;

        const matrix: Record<SocialMediaType, SocialMediaInfo> = {
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
        }

        const platform: SocialMediaInfo = matrix[type];
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
     * @param {ApiImageOptions} options - options for the type and size of the image to collect
     * @returns {string} A fully qualified image URL.
     */
    static getApiImageUrl(url: string | null, options: ApiImageOptions): string {

        if (typeof url !== 'string' || url.trim() === '') {

            //if empty or null define placeholder
            if (options.type == "poster" || options.type == "profile") {
                return '/portrait_default_image.svg';
            } else {
                return '/profile_image_blank.webp';
            }

        }

        //get the URL based on values
        return `https://image.tmdb.org/t/p/${options.size}${url}`;

    }

    /**
     * Given a page name, return the corrected title (ensuring Movie Search is prepended)
     * @param page {string}
     * @returns {string}
     */
    static getSiteNameForPage(page: string): string {
        if (page !== '') {
            return `Movie Search - ${page}`;
        } else {
            return `Movie Search`;
        }
    }

    /**
     * Given a genre object (of id,name) return a formatted genre button, linking correctly to the single genre page
     * @param {Genre} genre - object of id and name
     * @param {string} key - unique key for the button, because they are all called as siblings
     * @returns {Element}
     */
    static getGenreButton = (genre: Genre, key: string): JSX.Element => {
        return <GenreButtonWrapper genre={genre} key={key}/>
    }

    /**
     * Given a movie id, return either the movie from the cache if we have it, or fetch it from the API directly.
     * Will return the extended details about the movie,containing details
     *
     * @param movieId
     * @returns
     */
    static async getMovie(movieId: number | string) {

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
                'movie-id': movieId.toString()
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

    /**
     * Save the resulting upcoming movies into session storage
     * @param movies
     */
    static setUpcomingMoviesCache(movies: MovieResult[]) {
        sessionStorage.setItem('upcoming_movies', JSON.stringify(movies));
    }

    /**
     * Collect the upcoming movies from session storage
     */
    static getUpcomingMoviesCache(): MovieResult[] | null {
        const stored = sessionStorage.getItem('upcoming_movies');
        return (stored) ? (JSON.parse(stored) as MovieResult[]) : null;
    }
}

export default Utilities;
