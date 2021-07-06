import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './components/helper';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signup';
import ConfirmSignUp from './components/confirmsignup';
import { Auth } from 'aws-amplify';
import Hidden from './components/hidden';
import ForgotPassword from './components/forgotpassword';
import ChangePassword from './components/changepassword';

class App extends Component{
    // Authentication state
    state = {
        isAuthenticated:false,
        isAuthenticating: true,
        user: null
    }
    
    /**
     * Authenticates the current session
     */
    componentDidMount = async () =>{
        await Auth.currentSession().then((session) => {
            // If the promise is recieved, then authenticate the user
            this.setState({
                isAuthenticated: true,
                isAuthenticating: false,
                user: session
            });
            console.log(session)
        }).catch((error)=> {
            // If the promise is not recieved, then the user cannot be authenticated         
            this.setState({
                isAuthenticating: false,
                user: null
            })
            console.log(error)
        });
    }

    /**
     * Create routes depending on the path
     * @returns The correct route to take based on the path
     */
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'> <Home/> </Route>
                    <Route path='/login'> <Login/> </Route>
                    <Route path='/forgotpassword'> <ForgotPassword/> </Route>
                    <Route path='/signup'> <SignUp/> </Route>
                    <Route path='/confirmsignup'> <ConfirmSignUp/> </Route>
                    <PrivateRoute path ='/changepassword' component={ChangePassword} isAuthenticated={this.state.isAuthenticated}
                        isAuthenticating={this.state.isAuthenticating} />
                    <PrivateRoute path ='/hidden' component={Hidden} user={this.state.user}
                        isAuthenticated={this.state.isAuthenticated} isAuthenticating={this.state.isAuthenticating} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;