import React from "react";

// Import the UI elements
import { 
	Popover, 
	Menu
 } from "evergreen-ui";


const listMenu =  ({ content, icon }) => {
    return (
        <Popover content={
            <Menu>
                {
                    content.map(value => {
                        
                        

                    })
                }
                <Menu.Group>
                    <Menu.Item icon="edit">View</Menu.Item>
                    <Menu.Item icon="share">Share</Menu.Item>
                    <Menu.Item icon="chat">Message</Menu.Item>
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group>
                    <Menu.Item intent="danger" icon="trash">Delete</Menu.Item>
                </Menu.Group>
            </Menu>
        }>
            <IconButton appearance="minimal" icon="more" />
        </Popover>
    )
}

