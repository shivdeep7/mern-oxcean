import React from 'react'
import PropTypes from 'prop-types'

// Import the UI components
import { Pane, Card, Avatar, Button, Text, Tab, Popover, Menu, Position, toaster } from "evergreen-ui";

const NavBar = props => {
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
            				<Menu.Item>Logout</Menu.Item>
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

}

export default NavBar;
