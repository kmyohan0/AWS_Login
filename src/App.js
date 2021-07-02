import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './components/helper';
import Home from './components/home';
import Login from './components/login';
import Employee from './components/employee';

class App extends Component{

    state = {
        isAuthenticated:false,
        isAuthenticating: true
    }
    
    componentDidMount = () =>{
        this.setState = {
            isAuthenticated: true,
            isAuthenticating: false
        };
    }

    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'> <Home /> </Route>
                    <Route path='/login'> <Login /> </Route>
                    <PrivateRoute path ='/employee' component={Employee} isAuthenticated={this.state.isAuthenticated} isAuthenticating={this.state.isAuthenticating} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;