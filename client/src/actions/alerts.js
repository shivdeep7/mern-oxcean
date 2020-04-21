import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";

export const setAlerts = ( msg, alertType, killAlert = 5000 ) => dispatch => {

    // Gen a random id
    const id = uuid.v4();

    // Dispatch
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    }); 

    // Remove the alert right away
    // Toaster function will handle the time
    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), 0)

}
