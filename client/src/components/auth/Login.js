import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'


// Import the UI components
import { Button, TextInput, Card, Heading, Text } from 'evergreen-ui';

const Login = props => {
    return (
        <Card className="loginForm" elevation={1} justifyContent="center" alignItems="center" flexDirection="column">
                <img width="200" src="https://bankingthefuture.com/wp-content/uploads/2019/04/dummylogo.jpg" />
                <TextInput name="email" placeholder="Lambton Email" label="Your Email" />
                <TextInput name="password" placeholder="Lambton Password" label="Your Password" type="password"/>
                <Button appearance="primary" height="40" width="80%">Login</Button>
                <Text>Don't have account? <Link to="register">Register here</Link></Text>
    			<Link to="password">Forget Password?</Link>
        </Card>
    )
}

Login.propTypes = {

}

export default Login;
