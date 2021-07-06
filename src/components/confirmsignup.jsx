import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { toPageHandler } from './helper';
import { Pages } from './enum';

class ConfirmSignUp extends Component {
    /**
     * Constructs the ConfirmSignUp class
     * @param {*} props Properties
     */
    constructor(props){
        super(props);
        this.state = {
            username: '',
            code: ''
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
            case 'code':
                this.setState({code: event.target.value});
                break;
            default:
                this.setState({username: '', code: ''});
        }
    }

    /**
     * Checks the credentials and if valid, confirms the user's sign up
     * @param {*} event Submit event
     */
    submitHandler = async (event) =>{
        event.preventDefault();
        const {username, code} = this.state;

        try {
            await Auth.confirmSignUp(
                username,
                code
            );

            toPageHandler({
                target: {
                  name: Pages.LOGIN
                }  
            });
            console.log("confirmed!")
        }  
        catch (error) {
            console.log('error confirming signup', error);
        }

        
        alert('stop')
    }

    /**
     * Renders the confirm sign up page
     * @returns Confirm sign up page
     */
    render(){
        return (
            <div className = 'signup'>
                <button name={Pages.HOME} onClick={toPageHandler}>Home</button>
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