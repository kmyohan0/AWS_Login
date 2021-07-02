import React, { Component } from 'react';
import { toPageHandler } from './helper';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
                        username: '',
                        password: '',
        }
    }

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

    submitHandler = (event) =>{
        alert('username: ' + this.state.username + '\npassword: ' + this.state.password);
        event.preventDefault();
    }

    render(){
        return (
            <div className = 'login'>
                <button name='toHome' onClick={toPageHandler}>Home</button>
                <h1>Login Page</h1>
                <form onSubmit={this.submitHandler}>
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

export default Login;