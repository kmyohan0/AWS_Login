import React, { Component } from 'react';
import { toPageHandler } from './helper';

class Home extends Component {
    state = {};

    render(){
        return (
            <div className='home'>  
                <h1>Home Page</h1>
                <button name='toLogin' onClick={toPageHandler}>Login</button>    
                <button name='toSignUp' onClick={toPageHandler}>Sign Up</button>    
                <button name='toConfirmSignUp' onClick={toPageHandler}>Confirm Sign Up</button>    
                <button name='toSignOut' onClick={toPageHandler}>Sign Out</button>   
            </div>
        );
    }
}

export default Home;