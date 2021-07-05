import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { toPageHandler } from './helper';

class ConfirmSignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            code: ''
        }
    }

    changeHandler = (event) => {
        switch(event.target.name){
            case 'username':
                this.setState({username: event.target.value});
                break;
            case 'code':
                this.setState({code: event.target.value});
                break;
            default:
                this.setState({username: '', code: ''});
        }
        console.log(event.target.value)
    }

    submitHandler = async (event) =>{
        const {username, code} = this.state;
        try {
            const { user } = await Auth.confirmSignUp(
                username,
                code
            );
            console.log(user);
        }  
        catch (error) {
            console.log('error confirming signup', error);
        }

        event.preventDefault();
        alert('stop')
    }

    render(){
        return (
            <div className = 'signup'>
                <button name='toHome' onClick={toPageHandler}>Home</button>
                <h1>Confirm Sign Up Page</h1>
                <form onSubmit={this.submitHandler}>
                    <label>Username:</label><br/>
                    <input type='text' name='username' onChange={this.changeHandler}></input><br/><br/>

                    <label>Code:</label><br/>
                    <input type='text' name='code' onChange={this.changeHandler}></input><br/><br/>

                    <input type='submit'></input>
                </form>
            </div>     
        );
    }
}

export default ConfirmSignUp;