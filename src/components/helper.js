import React from 'react';
//import { Route } from 'react-router-dom'
import Login from './login';
//import Employee from './employee';

/**
 * Helper function that redirects the page based on the event
 * @param {*} event 
 */
export const toPageHandler = (event) => {
    let page = '';

    switch(event.target.name){
        case 'toHome':
            page = '/'
            break;
        case 'toLogin':
            page = '/login'
            break;
        default:
            page = '/'
    }

    window.location.href = page;
}

export const PrivateRoute = (props) => {
    console.log(props)

    if(props.isAuthenticating)
        return <div>Authenticating</div>
    else if(!props.isAuthenticated)
        return <Login />;
    return <props.component/>;
}