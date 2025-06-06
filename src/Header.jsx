import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {faVideo} from "@fortawesome/free-solid-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import './components/header.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import slugify from "slugify";


const Header = () => {

    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);

    /**
     * When search icon clicked, toggle the form visability state
     */
    const onSearchIconClick = () => {

        setSearchVisible((prevState) => {
            return !prevState;
        });

    }

    /**
     * Handle search submit and move
     * @param e
     */
    const handleSearchSubmit = (e) => {

        e.preventDefault();

        setSearchVisible(false);

        if (searchInput.trim() !== '') {

            let urlEncodedQuery = slugify(searchInput, {lower: true, strict: true});
            navigate(`/search?q=${urlEncodedQuery}`);
            setSearchInput('');

        }

    }

    return (
        <header className="page-header">
            <div className="container mx-auto flex justify-between items-center">
                <section className="header-title flex gap-4  justify-stretch items-center">
                    <Link to={"/"} className="flex items-center gap-2" title="Home">
                        <FontAwesomeIcon icon={faVideo}/>
                        <span className="logo-text ">MovieSearch</span>
                    </Link>
                    <FontAwesomeIcon className="search-icon" title="Lets have a search!" icon={faSearch}
                                     onClick={onSearchIconClick}/>
                    {searchVisible &&
                        <div className="mini-search-form">
                            <form onSubmit={handleSearchSubmit} className="">
                                <input
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
                    }
                </section>
                <section className="header-links flex gap-4 items-center">
                    <nav className="space-x-4">
                        <Link to="/movies" className="hover:underline">Movies</Link>
                    </nav>
                    <span
                        className="user-icon flex justify-center items-center bg-white rounded-full w-[30px] h-[30px] text-gray-800">
                        <Link to="/dashboard" className="hover:underline">
                            <FontAwesomeIcon icon={faUser}/>
                        </Link>
                    </span>
                </section>
            </div>
        </header>
    )
}
export default Header;
