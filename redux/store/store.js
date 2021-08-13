import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunk from "redux-thunk";

import reducer from "../reducers/userReducer";

const persistConfig = {
  key: "primary",
  storage,
  whitelist: ["username", "token", "email", "isLoggedIn", "active_plans"], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  // composeWithDevTools(applyMiddleware(logger, thunk))
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

//the ultimate store
