import dotenv from "dotenv";
import HttpError from "./httpError";
import ApiHelper from "./utilities/apihelper";

export default async function Genres(request, response) {

    //get genres from helper
    const apiHelper = new ApiHelper();
    const result = await apiHelper.getGenres();

    return response.status(result.status).json(result.data);
}

