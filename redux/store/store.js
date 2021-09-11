import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";
import thunk from "redux-thunk";
import { loadFromLocalStorage } from "redux/localStorage";
import reducer from "../reducers/userReducer";

let persistantState = undefined;

if (typeof window !== undefined) {
  persistantState = loadFromLocalStorage();
}

const store = createStore(
  reducer,
  persistantState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

//the ultimate store
