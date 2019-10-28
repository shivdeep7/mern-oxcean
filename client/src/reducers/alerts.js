import { SET_ALERT, REMOVE_ALERT } from "../actions/types.js";
const initialState = [];

export default (state = initialState, action) => {

    // Get the type and payload
    const { type, payload  } = action;

    switch(type) { 
        case SET_ALERT:
            return [  ...state, payload ];
        case REMOVE_ALERT:
            // In case someone decides to use the alert component instead of toaster
            return state.filter(alert => alert.id !== payload);
        default:
            return state
    }
}