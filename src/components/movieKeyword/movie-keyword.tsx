import {Link} from "react-router-dom";
import slugify from "slugify";
import {Keyword} from "@contracts/keyword";
import {JSX} from "react";

type MovieKeywordProps = {
    keyword: Keyword
}
export default function MovieKeyword({keyword} : MovieKeywordProps): JSX.Element{

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
