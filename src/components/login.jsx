import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { toPageHandler } from './helper';
import { Pages } from './enum';

class Login extends Component {
    /**
     * Constructs the Login class
     * @param {*} props Properties
     */
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    /**
     * Updates the state attributes with respect to the input being modified 
     * @param {} event The input event
     */
    changeHandler = (event) => {
        switch(event.target.name){
            case 'username':
                this.setState({username: event.target.value});
                break;
            case 'password':
                this.setState({password: event.target.value});
                break;
            default:
                this.setState({username: '', password: ''});
        }
    }

    /**
     * Checks the credentials and if valid, logs the user in
     * @param {*} event Submit event
     */
    submitHandler = async (event) =>{
        event.preventDefault();
        const {username, password} = this.state;
        
        try {
            const user = await Auth.signIn(username, password);
            console.log(user)
            toPageHandler(event)
        }
        catch (error) {
            console.log('error signing in', error);
            if(error.code === 'UserNotConfirmedException')
                toPageHandler({
                  target: {
                    name: Pages.CONFIRM_SIGNUP
                  }  
                });
        }
        
        alert('stop')
    }

    /**
     * Renders the login page
     * @returns Login page
     */
    render(){
        return (
            <div className = 'login'>
                <button name={Pages.HOME} onClick={toPageHandler}>Home</button>
                <h1>Login Page</h1>
                <form name={Pages.HIDDEN} onSubmit={this.submitHandler}>
                    <label>Username:</label><br/>
                    <input type='text' name='username' onChange={this.changeHandler}></input><br/><br/>

                    <label>Password:</label><br/>
                    <input type='password' name='password' onChange={this.changeHandler}></input><br/><br/>

                    <input type='submit'></input>

                    <a href='/forgotpassword'>Forgot Password?</a>
                </form>

                
            </div>     
        );
    }
}

export default Login;