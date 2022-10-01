import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom"
import './index.css';
import App from './App';
import { ContextProvider } from './context/context';
import { UserProvider } from './context/user.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ContextProvider>
        <Router>
          <App />
        </Router>
      </ContextProvider> 
    </UserProvider>       
  </React.StrictMode>
);


