import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Utils from "./utils/Utils";

// Components
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import NotFound from "./components/pages/NotFound";
import Home from "./components/pages/Home";

const NotValidRoute = ({component: Component, ...rest}) => (
    <Route{...rest} render={(props) => (
        !Utils.isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/home' />
    )} />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Utils.isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
);

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <NotValidRoute exact path="/" component={Login} />
                    <NotValidRoute exact path="/login" component={Login} />
                    <NotValidRoute exact path="/signup" component={SignUp} />
                    <PrivateRoute exact path="/home" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
