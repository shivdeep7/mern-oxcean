import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
 
// Redux
import { logout } from "../../actions/auth"

// Import the UI components
import { Pane, Card, Avatar, Button, Text, Tab, Popover, Menu, Position, toaster } from "evergreen-ui";

const NavBar = ({logout}) => {


    return (
        <Pane className="NavBar">
            <Card>
            	<img width="140" src="https://bankingthefuture.com/wp-content/uploads/2019/04/dummylogo.jpg" />
            </Card>
            <nav class="nav">
            	<Tab>Apps</Tab>
            	<Tab>Database</Tab>
            	<Tab>Images</Tab>
            	<Tab>Snapshots</Tab> 
            	<Popover  
            	position={Position.BOTTOM_LEFT}
            	content={
            		<Menu>
            			<Menu.Group>
            				<Menu.Item>Profile</Menu.Item>
            				<Menu.Item onSelect={() => logout()}>Logout</Menu.Item>
            			</Menu.Group>
            		</Menu>
            	}
            >
        	<Avatar className="dropdown-account" name="Shivdeep Singh" size={33} />
            </Popover>
            </nav>
        </Pane>
    )
}

NavBar.propTypes = {
	logout: PropTypes.func.isRequired
}

export default connect(null, {logout})(NavBar);
