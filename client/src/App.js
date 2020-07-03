import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

// Redux
import { Provider, connect } from "react-redux";
import store from "./store.js";
import { loadUser } from "./actions/auth";

// Import the components as pages
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import ForgotPassword from "./components/auth/ForgotPassword.js";
import Dashboard from "./components/pages/Dashboard.js";
import EmptyPage from "./components/pages/EmptyPage.js";

// Import the UI components
import Alerts from './components/layout/Alerts.js';

// Import utils
import { setDefaultToken } from "./utils/setDefaultToken";
import PrivateRoute from "./routing/PrivateRoute";

// Set the token
 if (localStorage.token) {
  setDefaultToken(localStorage.token);
}

function App() {

  // Check the user authentication
  useEffect(() => {
     store.dispatch(loadUser()) 
    }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alerts />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/Empty" component={EmptyPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
