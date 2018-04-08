import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Utils from "./utils/Utils";

// Components
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PickTeams from "./components/PickTeams";
import NotFound from "./components/NotFound";

const NotValidRoute = ({component: Component, ...rest}) => (
    <Route{...rest} render={(props) => (
        !Utils.isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/home' />
    )} />
);

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <NotValidRoute exact path="/" component={Login} />
                    <NotValidRoute exact path="/login" component={Login} />
                    <NotValidRoute exact path="/signup/1" component={SignUp} />
                    <NotValidRoute exact path="/signup/2" component={PickTeams} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
