import React, { Component } from 'react';
import Home from './components/home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/login';
import Employee from './components/employee';




class App extends Component{

    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'> <Home /> </Route>
                    <Route path='/login'> <Login /> </Route>
                    <Route path='/employee'> <Employee /> </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;