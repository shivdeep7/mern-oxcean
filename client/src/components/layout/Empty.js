import React from "react";
import { Link } from "react-router-dom";

// Import the UI components
import { Button, Card, Text, Heading } from "evergreen-ui";

const Empty = props => {

	return (
		<Card className="card-default" elevation={1}>
			<img width="200" src="https://storage.googleapis.com/glaze-ecom.appspot.com/images/wzPbmUrXM/thumbs/watermark.png" />
			<div className="card-content">
				<Heading size={600}>No Application Found</Heading>
				<Text>You don't have any application right now. Please click on the link below to create a new application.</Text>
			</div>
			<Button appearance="primary">Create New</Button>
		</Card>
	)
}

export default Empty;