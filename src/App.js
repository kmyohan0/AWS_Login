import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './components/helper';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signup';
import ConfirmSignUp from './components/confirmsignup';
import SignOut from './components/signout';
import { Auth } from 'aws-amplify';
import Hidden from './components/hidden';

class App extends Component{
    // Authentication State
    state = {
        isAuthenticated:false,
        isAuthenticating: true
    }
    
    /**
     * Tries to authenticate the user
     */
    componentDidMount = async () =>{
        await Auth.currentSession().then((session) => {
            console.log(session)
            this.setState({
                isAuthenticated: true,
                isAuthenticating: false
            });
        }).catch((error)=> {
            console.log(error)
            this.setState({
                isAuthenticating: false
            })
        });
        
    }

    /**
     * Create routes depending on the path
     * @returns 
     */
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'> <Home/> </Route>
                    <Route path='/login'> <Login/> </Route>
                    <Route path='/signup'> <SignUp/> </Route>
                    <Route path='/confirmsignup'> <ConfirmSignUp/> </Route>
                    <Route path= '/signout'> <SignOut/> </Route>
                    <PrivateRoute path ='/hidden' component={Hidden} isAuthenticated={this.state.isAuthenticated} isAuthenticating={this.state.isAuthenticating} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;