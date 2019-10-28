import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

// Redux
import { Provider } from "react-redux";
import store from "./store.js";

// Import the components as pages
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import ForgotPassword from "./components/auth/ForgotPassword.js";
import Dashboard from "./components/pages/Dashboard.js";
import EmptyPage from "./components/pages/EmptyPage.js";

// Import the UI components
import Alerts from './components/layout/Alerts.js';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Alerts />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/Empty" component={EmptyPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
