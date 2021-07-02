import React, { Component } from 'react';
import { toPageHandler } from './helper';

class Home extends Component {
    state = {};
    
    render(){
        return (
            <div className='home'>  
                <h1>Home Page</h1>
                <button name='toLogin' onClick={toPageHandler}>Login</button>       
            </div>
        );
    }
}

export default Home;