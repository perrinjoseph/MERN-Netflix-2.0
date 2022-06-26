import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const allMiddleWares = [thunk];
const thunkEnhancer = applyMiddleware(...allMiddleWares);
const composedEnhancers = composeWithDevTools(thunkEnhancer);
const store = createStore(rootReducer, composedEnhancers);

export default store;
