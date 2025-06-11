import {AppDataSource} from "../src/data-source.js";
import _ from "lodash";

import validator from "validator";


export default async function userSignup(request, response) {

    if (request.method !== 'POST') {
        return response.status(405).json({message: "GET requests not allowed here, must be a POST request"});
    }

    //collect and verify body exists and has values passed
    const body =  request.body;

    if (!body || Object.keys(body).length === 0) {
        return response.status(500).json({message: "The request body is either empty or undefined"})
    }

    //destructure into variables for processing
    let {email = '', username = '', password = ''} = body;


    //validate user data
    if(!validator.isEmail(email) || validator.isEmpty(email)){
        return response.status(400).json({message: "The provided email was either empty or invalid"});
    }

    /*
   if(validator.isEmpty(username)){
       return response.status(400).json({message: "The provided username was invalid or empty"});
   }

   if(validator.isEmpty(password)){
       return response.status(400).json({message: "The provided password was invalid or empty"});
   }
*/

    return response.status(200).json({message: 'all is good!'});


    //check for existing records

    //no user exists, create it

    //user exists, pass back an error

    //return success back to the front-end

    return response.status(200).json({message: 'woo'});


}
