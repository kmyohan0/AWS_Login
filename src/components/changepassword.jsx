import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { toPageHandler } from './helper';
import { Pages } from './enum';

class ChangePassword extends Component {
    /**
     * Constructs the ConfirmSignUp class
     * @param {*} props Properties
     */
    constructor(props){
        super(props);
        this.state = {
            old_password: '',
            new_password: ''
        }
    }

    /**
     * Updates the state attributes with respect to the input being modified 
     * @param {} event The input event
     */
    changeHandler = (event) => {
        switch(event.target.name){
            case 'old_password':
                this.setState({old_password: event.target.value});
                break;
            case 'new_password':
                this.setState({new_password: event.target.value});
                break;
            default:
                this.setState({old_password: '', new_password: ''});
        }
    }

    /**
     * Checks the credentials and if valid, confirms the user's sign up
     * @param {*} event Submit event
     */
    submitHandler = async (event) =>{
        event.preventDefault();
        const {old_password, new_password} = this.state;

        try {
            await Auth.currentAuthenticatedUser()
                .then(user=>{
                    Auth.changePassword(user, old_password, new_password)
                })
            console.log('password changed!')
        }  
        catch (error) {
            console.log('error confirming signup', error);
        }

        
        alert('stop')
    }

    /**
     * Renders the change password page
     * @returns Change password page
     */
    render(){
        return (
            <div className = 'changepassword'>
                <button name={Pages.HIDDEN} onClick={toPageHandler}>Back</button>
                <h1>Change Password Page</h1>
                <form onSubmit={this.submitHandler}>
                    <label>Old Password:</label><br/>
                    <input type='password' name='old_password' onChange={this.changeHandler}></input><br/><br/>

                    <label>New Password:</label><br/>
                    <input type='password' name='new_password' onChange={this.changeHandler}></input><br/><br/>

                    <input type='submit'></input>
                </form>
            </div>     
        );
    }
}

export default ChangePassword;