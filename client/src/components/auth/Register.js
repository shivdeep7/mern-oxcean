import React from 'react';

// Import the UI component 
import { TextInput, Button, Card, Text, Heading} from "evergreen-ui";

const Register = props => {


	return (
		  <Card className="loginForm" elevation={1} justifyContent="center" alignItems="center" flexDirection="column">
                <img width="200" src="https://www.lambtoncollege.ca/images/header/Logo-Brand.png" />
                <TextInput name="email" placeholder="Lambton Email" label="Your Email" />
                <TextInput name="password" placeholder="Lambton Password" label="Your Password" type="password"/>
                <TextInput name="password_confirm" placeholder="Confirm Password" label="Confirm Password" />
                <Button appearance="primary" height="40" width="80%">Login to Queens</Button>
                <Text>Forgot password? Click here to change.</Text>
        </Card>
	)

}

// Export the register component
export default Register;