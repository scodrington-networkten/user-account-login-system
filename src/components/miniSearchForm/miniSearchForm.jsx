import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import slugify from "slugify";
import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import './mini-search-form.css';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {faSpinner} from "@fortawesome/free-solid-svg-icons";


import {useSharedState} from "@contexts/SharedStateConext.jsx";
import Utilities from "../../utilities.jsx";

const MiniSearchForm = () => {


    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [searchInput, setSearchInput] = useState('');
    const {openMiniSearchForm, closeMiniSearchForm, miniSearchFormOpen} = useSharedState();

    //used for the dynamic ajax search
    const [searchRequestLoading, setSearchRequestLoading] = useState(true);
    const [searchResults, setSearchResults] = useState(null)


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


    /**
     * Handle search submit and move
     * @param e
     */
    const handleSearchSubmit = (e) => {

        e.preventDefault();
        if (searchInput.trim() !== '') {

            closeMiniSearchForm();

            let urlEncodedQuery = slugify(searchInput, {lower: true, strict: true});
            navigate(`/search?q=${urlEncodedQuery}`);
            setSearchInput('');

        }
    }

    const handleInputUpdate = async (e) => {
        const value = e.target.value;
        setSearchInput(value);
    }


    //when data changes, if the form is open auto focus the input
    useEffect(() => {

        if (miniSearchFormOpen) {
            inputRef.current.focus();
        }

    }, [miniSearchFormOpen]);

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
                    <p>No movies found</p>
                </div>
            )
        }

        return (
            <section className="search-results">
                {searchResults.map((item, index) => {
                    return (
                        <article className="result">
                            <div className="left">
                                <img src={Utilities.getApiImageUrl(item.poster_path, 'poster', 'w92')}/>
                            </div>
                            <div className="right">
                                <h3 className="title">{item.original_title}</h3>
                                <p className="date">{Utilities.formatDate(item.release_date)}</p>
                                <div className="vote-section">
                                    <p className="votes">Votes: {item.vote_count}</p>
                                    <p className="score">Score: {item.vote_average}</p>
                                </div>
                            </div>


                        </article>
                    )
                })}
            </section>
        )

    }

    const onCloseForm = () => {
        closeMiniSearchForm();

        //clearup data
        setSearchResults(null);
        setSearchInput('');
    }


    return (
        <div className="mini-search-form">

            <div className="background-overlay backdrop-blur-sm bg-black/40"
                 onClick={onCloseForm}>
                <div className="search-form">
                    <h2>What are you searching for?</h2>
                    <div className="close-button" onClick={onCloseForm}><FontAwesomeIcon
                        icon={faXmark}/></div>
                    <form onSubmit={handleSearchSubmit} className="">
                        <div className="input-section">
                            <input
                                ref={inputRef}
                                name="search-text-input"
                                type="text"
                                className=""
                                placeholder="I'm looking for.."
                                value={searchInput}
                                onChange={(e) => {
                                    handleInputUpdate(e)
                                }}
                            />
                            {searchRequestLoading &&
                                <p><FontAwesomeIcon icon={faSpinner} className="loading-icon fa-spin"/></p>
                            }
                        </div>

                        <button type="submit" className="">
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
