import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

// Import the components as pages
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import Dashboard from "./components/pages/Dashboard.js";
import EmptyPage from "./components/pages/EmptyPage.js";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/Empty" component={EmptyPage} />
      </Switch>
    </Router>
  );
}

export default App;
