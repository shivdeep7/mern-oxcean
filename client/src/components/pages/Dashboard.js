import React, { Fragment } from 'react';
import PropTypes from 'prop-types'

// Import the sub components
import NavBar from "../layout/NavBar.js";
import ListView from "../layout/ListView.js";


const Dashboard = props => {
    return (
        <Fragment>
            <NavBar />
            <ListView />
        </Fragment>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
