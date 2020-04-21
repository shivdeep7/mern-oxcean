import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Redux
import { login } from "../../actions/auth";

// Import the UI components
import {
    Button,
    TextInput,
    Card,
    Heading,
    Text
} from "evergreen-ui";

const Login = ({ login, auth: { isAuthenticated, loading } }) => {

    // Define the state
    const [ formData, setData ] = useState({
        email: "",
        password: ""
    }) 

    // Extract the state
    const { email, password } = formData;

    // Set the state
    const onChange = (e) => {
        setData({ ...formData, [e.target.name]: e.target.value });
    }

    // On submit/click
    const onClick = () => {
        // Run the action
        login(email, password);
    }

    // Check if user is logged in
    if (isAuthenticated) {
       return <Redirect to="/dashboard" />
    }

    return ( 
        <Card className="loginForm"
        elevation = {
            1
        }
        justifyContent = "center"
        alignItems = "center"
        flexDirection = "column" >
            <img width = "200" src = "https://bankingthefuture.com/wp-content/uploads/2019/04/dummylogo.jpg" />
            <TextInput name = "email"
                placeholder = "Your Email"
                label = "Your Email"
                onChange={(e) => onChange(e)}
            />
            <TextInput name = "password"
                placeholder = "Password"
                label = "Your Password"
                type = "password" 
                onChange={(e) => onChange(e)}
            />
            <Button appearance = "primary"
                height = "40"
                width = "80%"
                onClick={onClick} >Login</Button> 
            
            <Text> Don 't have account? <Link to="register">Register here</Link>
            </Text> <Link to = "password" > Forget Password ? </Link> 
        </Card>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login})(Login);