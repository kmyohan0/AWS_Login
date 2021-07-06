import React from 'react';
import Login from './login';
import { Pages } from './enum';

/**
 * Helper function that redirects the page based on the event
 * @param {*} event 
 */
export const toPageHandler = (event) => {
    let page = '';

    switch(event.target.name){
        case Pages.HOME:
            page = '/'
            break;
        case Pages.LOGIN:
            page = '/login'
            break;
        case Pages.HIDDEN:
            page = '/hidden'
            break;
        case Pages.SIGNUP:
            page = '/signup'
            break;
        case Pages.CONFIRM_SIGNUP:
            page = '/confirmsignup'
            break;
        default:
            page = '/'
    }

    window.location.href = page;
}

/**
 * Used to create private routes that require authentication
 * @param {*} props 
 * @returns 
 */
export const PrivateRoute = (props) => {
    if(props.isAuthenticating)
        return <div>Authenticating</div>
    else if(!props.isAuthenticated)
        return <Login />;
    return <props.component user={props.user}/>;
}