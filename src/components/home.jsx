import React, { Component } from 'react';
import { toPageHandler } from './helper';
import { Pages } from './enum';

class Home extends Component {
    state = {};

    render(){
        return (
            <div className='home'>  
                <h1>Home Page</h1>
                <button name={Pages.LOGIN} onClick={toPageHandler}>Login</button>    
                <button name={Pages.SIGNUP} onClick={toPageHandler}>Sign Up</button>    
                <button name={Pages.CONFIRM_SIGNUP} onClick={toPageHandler}>Confirm Sign Up</button>    
                <button name={Pages.SIGNOUT} onClick={toPageHandler}>Sign Out</button>   
            </div>
        );
    }
}

export default Home;