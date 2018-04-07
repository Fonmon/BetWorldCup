import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// Components
import Login from "./components/Login";
import NotFound from "./components/NotFound";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
