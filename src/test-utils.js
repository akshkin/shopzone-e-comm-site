import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { MemoryRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

// type ChildrenType = {
//   children: ReactNode,
//   options?: {}
// }

const renderWithProvider = (children, options) => {
  render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MemoryRouter>{children}</MemoryRouter>
      </PersistGate>
    </Provider>,
    options
  );
};

export * from "@testing-library/react";

export { renderWithProvider as render };
