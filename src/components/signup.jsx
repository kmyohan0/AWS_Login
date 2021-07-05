import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { toPageHandler } from './helper';
import { Pages } from './enum';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email: ''
        }
    }

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

    submitHandler = async (event) =>{
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

        event.preventDefault();
        alert('stop')
    }

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