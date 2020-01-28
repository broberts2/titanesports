import { createStore, combineReducers, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history)
  });

export default function configureStore() {
  return createStore(rootReducer(history), applyMiddleware(thunk));
}
