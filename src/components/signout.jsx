import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { toPageHandler } from './helper';
import { Pages } from './enum';

class SignOut extends Component {
    submitHandler = async (event) =>{
        event.preventDefault();
        
        try {
            await Auth.signOut();
        }  
        catch (error) {
            console.log('error signing out', error);
        }
        
        toPageHandler(event)
    }

    render(){
        return (
            <div className = 'signout'>
                <button name={Pages.HOME} onClick={toPageHandler}>Home</button>
                <h1>Sign Out Page</h1>
                <button name={Pages.HOME} onClick={this.submitHandler}>Sign Out</button>
            </div>     
        );
    }
}

export default SignOut;