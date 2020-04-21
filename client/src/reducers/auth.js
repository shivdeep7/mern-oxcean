import { REGISTER_SUCCESS, REGISTER_FAIL, LOAD_USER, AUTH_FAIL, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: false
}

export default (state = initialState, action) => {

    const { type, payload } = action;
    
    switch(type) {
        case LOAD_USER:
            return {
                ...state,
                user: payload,
                isAuthenticated: true, 
                loading: false 
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                 ...state, 
                 ...payload, 
                 isAuthenticated: true, 
                 loading: false 
            }
        case REGISTER_FAIL:
        case AUTH_FAIL:
        case LOGOUT:
        case LOGIN_FAILED:
            localStorage.removeItem('token');
            return {
                ...state, 
                token: null, 
                isAuthenticated: false, 
                loading: false 
           }
        default:
            return state;
    }

}