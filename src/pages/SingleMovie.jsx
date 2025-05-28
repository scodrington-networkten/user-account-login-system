import {useParams} from "react-router-dom";
const SingleMovie = () => {

    let {id} = useParams();
    id = 1160956;

    return (
        <h2>Single move here {id}</h2>
    )
}
export default SingleMovie;
