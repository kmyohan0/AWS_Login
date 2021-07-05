import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { toPageHandler } from './helper';
import { Pages } from './enum';

class SignOut extends Component {
    submitHandler = async (event) =>{
        try {
            await Auth.signOut();
        }  
        catch (error) {
            console.log('error signing out', error);
        }

        event.preventDefault();
        alert('stop')
    }

    render(){
        return (
            <div className = 'signout'>
                <button name={Pages.HOME} onClick={toPageHandler}>Home</button>
                <h1>Sign Out Page</h1>
                <button onClick={this.submitHandler}>Sign Out</button>
            </div>     
        );
    }
}

export default SignOut;