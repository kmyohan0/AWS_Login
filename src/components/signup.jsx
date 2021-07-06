import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { toPageHandler } from './helper';
import { Pages } from './enum';

class SignUp extends Component {
    /**
     * Constructs the SignUp class
     * @param {*} props Properties
     */
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email: ''
        }
    }

    /**
     * Updates the state attributes with respect to the input being modified 
     * @param {} event The input event
     */
    changeHandler = (event) => {
        switch(event.target.name){
            case 'email':
                this.setState({email: event.target.value});
                break;
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
     * Checks the credentials and if valid, signs the user up
     * @param {*} event Submit event
     */
    submitHandler = async (event) =>{
        event.preventDefault();
        const {username, password, email} = this.state;
        
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email
                }
            });
            console.log(user);
        }  
        catch (error) {
            console.log('error signing up', error);
        }

        alert('stop')
    }

    /**
     * Renders the sign up page
     * @returns Sign up page
     */
    render(){
        return (
            <div className = 'signup'>
                <button name={Pages.HOME} onClick={toPageHandler}>Home</button>
                <h1>Sign Up Page</h1>
                <form onSubmit={this.submitHandler}>
                    <label>Email:</label><br/>
                    <input type='text' name='email' onChange={this.changeHandler}></input><br/><br/>

                    <label>Username:</label><br/>
                    <input type='text' name='username' onChange={this.changeHandler}></input><br/><br/>

                    <label>Password:</label><br/>
                    <input type='password' name='password' onChange={this.changeHandler}></input><br/><br/>

                    <input type='submit'></input>
                </form>
            </div>     
        );
    }
}

export default SignUp;