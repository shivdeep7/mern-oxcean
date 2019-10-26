import React from 'react';
import { Link } from "react-router-dom";


// Import the UI component 
import { TextInput, Button, Card, Text, Heading} from "evergreen-ui";

const Register = props => {


	return (
		  <Card className="loginForm" elevation={1} justifyContent="center" alignItems="center" flexDirection="column">
                <img width="200" src="https://bankingthefuture.com/wp-content/uploads/2019/04/dummylogo.jpg" />
                <TextInput name="email" placeholder="Your Email" label="Your Email" />
                <TextInput name="password" placeholder="Password" label="Your Password" type="password"/>
                <TextInput name="password_confirm" placeholder="Confirm Password" label="Confirm Password" />
                <Button appearance="primary" height="40" width="80%">Get Started</Button>
                <Text>Already got a account? <Link to="/login">Login in here.</Link></Text>
        </Card>
	)

}

// Export the register component
export default Register;