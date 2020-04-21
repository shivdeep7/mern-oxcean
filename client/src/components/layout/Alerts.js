import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

// Import the UI components
import { toaster } from "evergreen-ui";

// Function to exec alert
const execAlert = ({ msg, alertType }) => {
    toaster[alertType](msg);
}

const Alerts = ({alerts}) => 
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(currentAlert => execAlert(currentAlert) )

Alerts.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alerts
})

export default connect(mapStateToProps)(Alerts);