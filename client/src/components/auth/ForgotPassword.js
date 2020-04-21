import React from "react";
import {
    Link
} from "react-router-dom";
import PropTypes from "prop-types";


// Import the UI components
import {
    Button,
    TextInput,
    Card,
    Text,
    Heading,
} from "evergreen-ui";

const ForgotPassword = props => {
    return ( <
        Card className = "loginForm"
        elevation = {
            1
        }
        justifyContent = "center"
        alignItems = "center"
        flexDirection = "column" >
        
        <Heading size={600} marginBottom={5}>Forgot Password?</Heading>
        <Text marginBottom={10} textAlign="center"> We will send you link to change it. </Text>

        <
        TextInput name = "email"
        placeholder = "Your Email"
        label = "Your Email" / >
       
        <
        Button appearance = "primary"
        height = "40"
        width = "80%" >
        Send Email <
        /Button> 
        <Text> Don't have account? <Link to="register">Register here</Link></Text>
         </Card>
    );
};

ForgotPassword.propTypes = {};
export default ForgotPassword;