import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import slugify from "slugify";
import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {SharedStateProvider, useSharedState} from "@contexts/SharedStateConext.jsx";

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

        setMiniSearchFormOpen(false);

        if (searchInput.trim() !== '') {

            let urlEncodedQuery = slugify(searchInput, {lower: true, strict: true});
            navigate(`/search?q=${urlEncodedQuery}`);
            setSearchInput('');

        }

    }

    //when search form visability changes, ensure if its visible we set focus
    useEffect(() => {

        /*
        if (miniSearchFormOpen) {
            inputRef.current.focus();
        }*/

    }, [miniSearchFormOpen]);


    const getSearchFormSection = () => {

        if (!miniSearchFormOpen) return null

        return (
            <div className="mini-search-form">
                <div className="background-overlay"></div>
                <div className="search-form">
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
