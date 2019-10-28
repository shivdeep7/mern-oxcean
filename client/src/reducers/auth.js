import { REGISTER_SUCCESS, REGISTER_FAIL } from "../action/types";

initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: 
}

export default (state = initialState, payload) => {

    const { type, payload } = action;
    
    switch(type) {
        case REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                 ...state, 
                 ...payload, 
                 isAuthenticated: true, 
                 loading: false 
            }
        case REGISTER_FAIL:
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