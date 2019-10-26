import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

// Import the UI elements
import { Pane, Menu, SearchInput, IconButton, Button, Avatar, Heading, Table, Card, Text, Pill, Popover } from "evergreen-ui";

const ListView = props => {

	return (
		<Pane className="container" marginTop={80}>
			<Card className="container-header">
				<Heading size={800} marginBottom={30}>My applications</Heading>
					<Button marginLeft={16} fontSize={20} color="#298eea" bottom={5} intent="none">+</Button>				
					<div className="alignRight">
					<SearchInput placeholder="Search Application" size={40} />
				</div>
			</Card>
			<Table>
				<Table.Head>
					<Table.TextHeaderCell>Name</Table.TextHeaderCell>
					<Table.TextHeaderCell>Status</Table.TextHeaderCell>
					<Table.TextHeaderCell>Created On</Table.TextHeaderCell>
					<Table.TextHeaderCell>Payment Due</Table.TextHeaderCell>
					<Table.TextHeaderCell></Table.TextHeaderCell>
				</Table.Head>
				<Table.Body>
					<Table.Row display="flex" alignItems="center">
						<Table.Cell>
							<Avatar name="Shivdeep Singh" size={20}/>
							<Text marginLeft={8}>Shivdeep Singh</Text>
						</Table.Cell>
						<Table.Cell>
							<Pill color="green">Avtive</Pill>
						</Table.Cell>
						<Table.Cell>
							<Text>22 December</Text>
						</Table.Cell>
						
						<Table.Cell>
							<Text>$303</Text>
						</Table.Cell>
						<Table.Cell>
							<Popover content={
								<Menu>
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
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</Pane>
	)

}

ListView.propTypes = {

}
export default ListView;