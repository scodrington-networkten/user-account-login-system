import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import slugify from "slugify";
import {useState, useRef, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import './mini-search-form.css';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

import SearchResultEntry from "@components/miniSearchForm/searchResultEntry.jsx";
import {useLocation} from "react-router-dom";


import {useSharedState} from "@contexts/SharedStateConext.jsx";

const MiniSearchForm = () => {


    const location = useLocation();
    const navigate = useNavigate();
    const searchInputRef = useRef(null);

    const [searchInput, setSearchInput] = useState('');
    const {openMiniSearchForm, closeMiniSearchForm, miniSearchFormOpen} = useSharedState();

    //used for the dynamic ajax search
    const [searchRequestLoading, setSearchRequestLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(null)

    /**
     * Handle search submit and move
     * @param e
     */
    const handleSearchSubmit = (e) => {

        e.preventDefault();

        if (searchInput.trim() !== '') {
            let urlEncodedQuery = slugify(searchInput, {lower: true, strict: true});
            navigate(`/search?q=${urlEncodedQuery}`);
            closeAndResetSearchForm();
        }
    }

    const handleInputUpdate = async (e) => {
        const value = e.target.value;
        setSearchInput(value);
    }

    /**
     * On form close, set search results and field
     */
    const closeAndResetSearchForm = () => {
        closeMiniSearchForm();

        //cleanup data
        setSearchResults(null);
        setSearchInput('');
    }

    /**
     * Clear search field, empty field and results
     */
    const clearSearchField = () => {
        setSearchInput('');
        setSearchResults(null);
    }


    /**  When the search form opens, add an overflow hidden on body to ensure no scrolling */
    useEffect(() => {

        if (miniSearchFormOpen) {
            document.documentElement.classList.add("no-scroll");
        } else {
            document.documentElement.classList.remove("no-scroll");
        }

        // optional: cleanup if component unmounts
        return () => document.body.classList.remove("no-scroll");

    }, [miniSearchFormOpen])

    /*** After a delay, blur the input field to de-focus the field and hide mobile keyboards*/
    useEffect(() => {

        const timer = setTimeout(() => {
            searchInputRef.current?.blur();
        }, 1000);

        return () => clearTimeout(timer);

    }, [searchInput])

    //handle the processing of the search query, using a debounce
    useEffect(() => {

        //dont trigger when search input is empty
        if (!searchInput.trim()) return;

        const timer = setTimeout(() => {

            //search based on inpit
            (async () => {

                try {
                    setSearchRequestLoading(true);
                    const result = await fetch(`/api/movie-search?q=${searchInput}&page=1`);
                    if (!result.ok) {
                        throw new Error('could not connect to the search API');
                    }

                    //collect movies matching
                    const data = await result.json();
                    if (data.json.results.length === 0) {
                        setSearchResults([])
                    } else {

                        const subset = data.json.results.slice(0, 5);
                        setSearchResults(subset);
                    }


                } catch (error) {
                    window.showToastNotification(error.message, 'error');
                } finally {
                    setSearchRequestLoading(false);
                }

            })();


        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [searchInput]);

    //when data changes, if the form is open auto-focus the input
    useEffect(() => {

        if (miniSearchFormOpen) {
            searchInputRef.current?.focus();
        }

    }, [miniSearchFormOpen]);

    //when navigate occurs, clear out and reset the component
    useEffect(() => {
        closeAndResetSearchForm();
    }, [location]);

    //handle the removal of the search form when users press 'back' or 'escape', closing the UI
    useEffect(() => {

        const handleBackButtonInput = () => {

            //if open, close it and then jump back 1 state
            if (miniSearchFormOpen) {
                closeMiniSearchForm()
            }
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeMiniSearchForm();
            }
        }

        window.addEventListener('popstate', handleBackButtonInput);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('popstate', handleBackButtonInput);
            window.removeEventListener('keydown', handleKeyDown);
        }

    }, [miniSearchFormOpen, navigate]);


    /**
     * Display the search results
     * @returns {unknown[]}
     */
    const displaySearchResults = () => {

        if (searchResults === null) {
            return null;
        }

        if (searchResults.length === 0) {
            return (
                <div className="search-results">
                    <p>No movies found!</p>
                </div>
            )
        }

        let urlEncodedQuery = slugify(searchInput, {lower: true, strict: true});
        return (
            <>
                <section className="view-all-results">
                    <Link className="button view-all-button" to={`/search?q=${urlEncodedQuery}`}>View All Results</Link>
                </section>
                <section className="search-results">
                    {searchResults.map((item, index) => {
                        return (
                            <SearchResultEntry movie={item} key={`search-result-${index}`}/>
                        )
                    })}
                </section>
            </>
        )

    }


    //if the form isnt open dont show
    if (miniSearchFormOpen === false) return;

    return (
        <div className="mini-search-form">
            <div className="background-overlay backdrop-blur-sm bg-black/40" onClick={closeAndResetSearchForm}></div>
            <div className="search-form">
                <div className="inner">
                    <h2>What are you searching for?</h2>
                    <div className="close-button" onClick={closeAndResetSearchForm}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                    <form onSubmit={handleSearchSubmit} className="">
                        <div className="input-section">
                            <input
                                ref={searchInputRef}
                                name="search-text-input"
                                type="text"
                                className=""
                                autoComplete="off"
                                placeholder="I'm looking for.."
                                value={searchInput}
                                onChange={(e) => {
                                    handleInputUpdate(e)
                                }}
                            />
                            <div className="icons">
                                {searchRequestLoading &&
                                    <FontAwesomeIcon icon={faSpinner} className="loading-icon fa-spin"/>
                                }
                                {searchInput &&
                                    <button
                                        type="button"
                                        onClick={clearSearchField}
                                        className="clear-search-field-button"
                                        aria-label="Clear search input"
                                        title="Clear search input"
                                    >
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </button>
                                }
                            </div>
                        </div>

                        <button type="submit" className="search">
                            <FontAwesomeIcon className="search-submit-icon" title="movie search"
                                             icon={faSearch}/>
                        </button>
                    </form>
                    {displaySearchResults()}
                </div>

            </div>

        </div>
    )


}

export default MiniSearchForm;
