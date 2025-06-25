import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import slugify from "slugify";
import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import './mini-search-form.css';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

import {useSharedState} from "@contexts/SharedStateConext.jsx";

const MiniSearchForm = () => {


    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [searchInput, setSearchInput] = useState('');
    const {miniSearchFormOpen, setMiniSearchFormOpen} = useSharedState();


    /**
     * Handle search submit and move
     * @param e
     */
    const handleSearchSubmit = (e) => {

        e.preventDefault();


        if (searchInput.trim() !== '') {

            onBackgroundOverlayClick();

            let urlEncodedQuery = slugify(searchInput, {lower: true, strict: true});
            navigate(`/search?q=${urlEncodedQuery}`);
            setSearchInput('');

        }
    }

    const onBackgroundOverlayClick = () => {
        closeMiniSearchForm();
    }

    const closeMiniSearchForm = () => {
        setMiniSearchFormOpen(false);
    }

    //when search form visability changes, ensure if its visible we set focus
    useEffect(() => {

        if (miniSearchFormOpen) {
            inputRef.current.focus();
        }

    }, [miniSearchFormOpen]);

    //handle the removal of the search form when uers press 'back' or 'escape', closing the UI
    useEffect(() => {

        const handlePopState = () => {

            //if open, close it and then jump back 1 state
            if (miniSearchFormOpen === true) {
                closeMiniSearchForm();
                navigate(-1);
            }
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeMiniSearchForm();
                navigate(-1);
            }
        }

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('keydown', handleKeyDown);
        }

    }, [miniSearchFormOpen, setMiniSearchFormOpen, navigate]);


    const getSearchFormSection = () => {

        if (!miniSearchFormOpen) return null

        return (
            <div className="mini-search-form">

                <div className="background-overlay" onClick={onBackgroundOverlayClick}></div>
                <div className="search-form">
                    <h2>What are you searching for?</h2>
                    <div className="close-button" onClick={onBackgroundOverlayClick}><FontAwesomeIcon icon={faXmark}/></div>
                    <form onSubmit={handleSearchSubmit} className="">
                        <input
                            ref={inputRef}
                            name="search-text-inpit"
                            type="text"
                            className=""
                            placeholder="Find a movie"
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                        />
                        <button type="submit" className="">
                            <FontAwesomeIcon className="search-submit-icon" title="movie search"
                                             icon={faSearch}/>
                        </button>
                    </form>
                </div>

            </div>
        )
    }

    return (
        getSearchFormSection()
    )

}

export default MiniSearchForm;
