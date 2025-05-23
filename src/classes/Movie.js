class Movie {

    constructor(data){
        // copies all enumerable properties from data to this
        Object.assign(this, data);
    }
}
export default Movie;
