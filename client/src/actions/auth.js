import axios from "axios";
import { setAlerts } from "./alerts";
import { REGISTER_SUCCESS, REGISTER_FAIL, LOAD_USER, AUTH_FAIL, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from "./types";

// Get the utils
import { setDefaultToken } from "../utils/setDefaultToken";

// Action to logout user
export const logout = () => dispatch => {

    // Dispatch 
    dispatch({
        type: LOGOUT,
    })

}


// Action to login user
export const login = ( email, password ) => async dispatch => {

    // Set the headers
    const config = {
        headers: {
            "content-type": "application/json",
        }
    }

    // JSON encode
    const data = JSON.stringify({ email, password });

    // Send the request 
    try {
        
        // Axios Request 
        const res = await axios.post("/api/auth/login", data, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        
        // Get the user
        dispatch(loadUser());

    } catch ( err ) {

        // Dispatch alert
        const errors = err.response.data.errors;
        if (errors)
            errors.forEach(error => dispatch(setAlerts(error.msg, "danger")));


        // Login failed 
        dispatch({
            type: LOGIN_FAILED
        })

    }

}


// Action to authenticate the user
export const loadUser = () => async dispatch => {

    // Set the token
    if (localStorage.token) {
        setDefaultToken(localStorage.token);
    }

    // Send reques to backend
    try {
        
        const res = await axios.get("/api/auth");

        dispatch({
            type: LOAD_USER,
            payload: res.data
        });

    } catch (err) {
        
        dispatch({
            type: AUTH_FAIL,
        })

    }

}

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

        // Load the user once registered
        dispatch(loadUser());

    } catch(err) {

        const errors = err.response.data.errors;

        // Alert
        if (errors)
            errors.forEach(error => dispatch(setAlerts(error.msg, "danger")))

        // Remove the token
        dispatch({
            type: REGISTER_FAIL
        })

    }

}