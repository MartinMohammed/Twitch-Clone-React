import ReactDOM from "react-dom";
import App from "./components/app";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";

// ---------- FOR HOOKING REACT DEV TOOLS CHROME EXTENSION WITH OUR REACT APPLICATION
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
