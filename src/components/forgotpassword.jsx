import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { toPageHandler } from './helper';
import { Pages } from './enum';

class ForgotPassword extends Component {
    /**
     * Constructs the ForgotPassword class
     * @param {*} props Properties
     */
    constructor(props){
        super(props);
        this.state = {
            username: '',
            code: '',
            password: '',
            step: 0
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
            case 'password':
                this.setState({password: event.target.value});
                break;
            default:
                this.setState({username: '', code: '', password: ''});
        }
    }

    /**
     * Checks the credentials and if valid, resets the user's password
     * @param {*} event Submit event
     */
    submitHandler = async (event) =>{
        event.preventDefault();
        const {username, code, password, step} = this.state;

        try {
            if(step === 0){    
                await Auth.forgotPassword(username);
                this.setState({step: 1})
            }
            else if(this.state.step === 1){
                await Auth.forgotPasswordSubmit(username, code, password);
                toPageHandler({
                    target: {
                      name: Pages.LOGIN
                    }  
                });
            }
        }  
        catch (error) {
            console.log('password reset error', error);
        }
        
        alert('stop')
    }

    /**
     * Renders the forgot password page
     * @returns Forgot Password page
     */
    render(){
        return (
            <div className = 'forgotpassword'>
                <button name={Pages.HOME} onClick={toPageHandler}>Home</button>
                <h1>Forgot Password Page</h1>
                <form onSubmit={this.submitHandler}>
                    <label>Username:</label><br/>
                    <input type='text' name='username' onChange={this.changeHandler}></input><br/><br/>
                    {
                        /** This is button appears only if the user already has their verification code */
                        this.state.step === 0 && (
                            <button onClick={()=>{this.setState({step:1})}}>I have my code</button>
                        )
                    }

                    {
                        /** This has the verification code and new password textboxes*/
                        this.state.step === 1 && (
                            <div>
                                <label>Code:</label><br/>
                                <input type='text' name='code' onChange={this.changeHandler}></input><br/><br/>

                                <label>New Password:</label><br/>
                                <input type='password' name='password' onChange={this.changeHandler}></input><br/><br/>
                            </div>
                        )
                    }
                    <input type='submit'></input>
                </form>
                
            </div>     
        );
    }
}

export default ForgotPassword;