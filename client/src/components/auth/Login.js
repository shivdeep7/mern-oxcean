import React from 'react'
import PropTypes from 'prop-types'

// Import the UI components
import { Button, TextInput, Card, Heading, Text } from 'evergreen-ui';

const Login = props => {
    return (
        <Card className="loginForm" elevation={1} justifyContent="center" alignItems="center" flexDirection="column">
                <img width="200" src="https://www.lambtoncollege.ca/images/header/Logo-Brand.png" />
                <TextInput name="email" placeholder="Lambton Email" label="Your Email" />
                <TextInput name="password" placeholder="Lambton Password" label="Your Password" type="password"/>
                <Button appearance="primary" height="40" width="80%">Login to Queens</Button>
                <Text>Forgot password? Click here to change.</Text>
        </Card>
    )
}

Login.propTypes = {

}

export default Login;
