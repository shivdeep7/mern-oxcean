import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL, SET_ALERT } from "./types";


// Action to register a user in database
export const register = ({name, email, password}) => async dispatch => {

    // Set the headers
    const config = {
        headers: {
            "content-type": "application/json",
        }
    }

    // Encode data as json
    const data = JSON.stringify({name, email, password});

    // Send the axios request
    try {
        
        const res = await axios.post("/api/users/register", data, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

    } catch(err) {

        const errors = err.response.data.errors;

        // Alert
        if (errors)
            errors.forEach(error => dispatch({
                type: SET_ALERT,
                payload: {
                    msg: error.msg,
                    alertType: "danger"
                }
            }))

        // Remove the token
        dispatch({
            type: REGISTER_FAIL
        })

    }

}