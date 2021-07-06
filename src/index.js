import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

// Configures amplify using the aws-exports config file
Amplify.configure(awsconfig);

// Render the main app
ReactDOM.render(<App />, document.getElementById('root'));