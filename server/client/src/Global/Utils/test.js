import { render } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import rootReducer from "../Redux/rootReducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

let store;
const AllProviders =
  (initialValue) =>
  ({ children }) => {
    const mockStore = createStore(
      rootReducer,
      initialValue,
      applyMiddleware(thunk)
    );
    store = mockStore;
    return (
      <ReduxProvider store={mockStore}>
        <Router>{children}</Router>
      </ReduxProvider>
    );
  };

const customRenderer = (component, options, initialValue = {}) =>
  render(component, { wrapper: AllProviders(initialValue), ...options });

//Re-exporting everything else
export * from "@testing-library/react";

//Overwrite
export { customRenderer as render };
export { store as mockReduxStore };
