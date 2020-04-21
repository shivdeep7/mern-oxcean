import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlerts }  from "../../actions/alerts.js";

// Import the UI component 
import {
        TextInput,
        Button,
        Card,
        Text,
        Heading
} from "evergreen-ui";
import { register } from '../../actions/auth.js';

const Register = ({ setAlerts, register }) => {

        // Declare the state using hooks
        const [formData, setData] = useState({
                name: "",
                email: "",
                password: "",
                password2: ""
        });


        // Get the data our of state
        const {
                name,
                email,
                password,
                password2
        } = formData;

        // Set the data on user input
        const onChange = e => setData({
                ...formData,
                [e.target.name]: e.target.value
        });

        // On click the submit button
        const onClick = () => {
                // Check if password matches the confirm password
                if ( password !== password2 ) {
                        setAlerts("Password does match with confirm password", "danger");
                }

                // Register user
                register({ name, email, password });
        }

        // Return
        return ( <Card className = "loginForm"
                elevation = {
                        1
                }
                justifyContent = "center"
                alignItems = "center"
                flexDirection = "column" >
                <img width = "200"
                src = "https://bankingthefuture.com/wp-content/uploads/2019/04/dummylogo.jpg" / >
                <
                TextInput name = "name"
                placeholder = "Full Name"
                label = "Your name"
                value = {
                        name
                }
                onChange = {
                        e => onChange(e)
                }
                required / >
                <
                TextInput name = "email"
                placeholder = "Your Email"
                label = "Your Email"
                value = {
                        email
                }
                onChange = {
                        e => onChange(e)
                }
                required / >
                <
                TextInput name = "password"
                placeholder = "Password"
                label = "Your Password"
                type = "password"
                value = {
                        password
                }
                onChange = {
                        e => onChange(e)
                }
                /> <
                TextInput name = "password2"
                placeholder = "Confirm Password"
                label = "Confirm Password"
                type = "password"
                value = {
                        password2
                }
                onChange = {
                        e => onChange(e)
                }
                /> <
                Button appearance = "primary"
                height = "40"
                onClick={onClick}
                width = "80%" > Get Started < /Button> <
                Text > Already got a account ? < Link to = "/login" > Login in here. < /Link></Text >
                <
                /Card>
        )

}

// Export the register component
export default connect(null, {setAlerts, register})(Register);