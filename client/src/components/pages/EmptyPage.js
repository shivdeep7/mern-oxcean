import React, { Fragment } from 'react';
import PropTypes from 'prop-types'

// Import the sub components
import NavBar from "../layout/NavBar.js";
import Empty from "../layout/Empty.js";

const EmptyPage = props => {
     return (
        <Fragment>
        	<NavBar />
            <Empty />
        </Fragment>
    )
}

EmptyPage.propTypes = {

}

export default EmptyPage
