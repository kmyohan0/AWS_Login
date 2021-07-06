import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { toPageHandler } from './helper';
import { Pages } from './enum';

class Hidden extends Component {
    /**
     * Constructs the Home class
     * @param {*} props Properties
     */
    constructor(props){
        super(props);
        this.state = {
            user: props.user
        }
    }

    /**
     * Signs the user out
     * @param {*} event Submit event
     */
    submitHandler = async (event) =>{
        event.preventDefault();
        
        try {
            await Auth.signOut();
            toPageHandler(event)
        }  
        catch (error) {
            console.log('error signing out', error);
        }
    }

    /**
     * Renders the hidden page
     * @returns Hidden page
     */
    render(){
        const username = this.state.user.accessToken.payload.username

        return (
            <div className='hidden'>
                <button name={Pages.HOME} onClick={this.submitHandler}>Sign Out</button>
                <h1>Hidden Page</h1>
                <p>Hi {username}!</p>
            </div>
        );
    }
}

export default Hidden;