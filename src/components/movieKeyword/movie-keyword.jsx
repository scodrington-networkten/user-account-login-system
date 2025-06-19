import {Link} from "react-router-dom";
import slugify from "slugify";

export default function MovieKeyword({keyword}){

    const getKeywordTitle = () => {
        return keyword.name;
    }

    const getKeywordUrl =() => {
        return slugify(keyword.name, {lower: true, strict: true});
    }

    return (
        <Link to={`/keyword/${getKeywordUrl()}`} className="button">{getKeywordTitle()}</Link>
    )
}
