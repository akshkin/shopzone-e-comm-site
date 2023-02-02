import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
// import { ContextProvider } from './context/context';
// import { UserProvider } from './context/user.context';
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <UserProvider>    
      <ContextProvider> */}
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    {/* </ContextProvider> 
    </UserProvider>        */}
  </React.StrictMode>
);
