import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

// Import the UI elements
import { 
	Pane, 
	Menu, 
	SearchInput, 
	IconButton, 
	Button, 
	Avatar, 
	Heading, 
	Table, 
	Card, 
	Text, 
	Pill, 
	Popover
 } from "evergreen-ui";

const ListView = ({ header, content }) => {

	return (
			<Table>
				<Table.Head>
					{
						header.map(value => {
							return 	<Table.TextHeaderCell>{value}</Table.TextHeaderCell>

						})
					}
				</Table.Head>
				<Table.Body>
					<Table.Row display="flex" alignItems="center">
						{
							content.map(value => {
								
								const { type, data } = value;
								let component = null;
								switch(type) {
									case avatar:
										component = <Avatar name={data.text} size={20}/>;
										component += <Text marginLeft={8}>{data.text}</Text>;
										break;
									case pill:
										component = <Pill color={data.status}>{data.text}</Pill>
										break;
									default: 
										component = <Text>{data.text}</Text>
										break;
								}
								return (
									<Table.Cell>{component}</Table.Cell>
								)

							})
						}
					</Table.Row>
				</Table.Body>
			</Table>
	)

}

ListView.propTypes = {

}
export default ListView;