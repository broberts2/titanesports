import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./configureStore";

import Home from "./components/home/home";

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route exact path="/" render={() => <Home />} />
        </ConnectedRouter>
      </Provider>
    );
  }
}
