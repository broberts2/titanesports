import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./configureStore";

import Components from "./components";
const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route exact path="/" render={() => <Components.Home />} />
          <Route exact path="/user" render={() => <Components.UserAccount />} />
          <Route
            exact
            path="/roster"
            render={() => <Components.RosterEditor />}
          />
          <Route
            exact
            path="/players"
            render={() => <Components.PlayerSearch />}
          />
        </ConnectedRouter>
      </Provider>
    );
  }
}
