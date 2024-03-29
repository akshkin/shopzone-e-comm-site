import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

import { store, persistor } from "./store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PersistGate } from "redux-persist/integration/react";
import { StyledLoader } from "./routes/products/products.style";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/*<PersistGate loading={<StyledLoader />} persistor={persistor}>*/}
      <PayPalScriptProvider>
        <App />
      </PayPalScriptProvider>
      {/*</PersistGate>*/}
    </Provider>
  </React.StrictMode>
);
