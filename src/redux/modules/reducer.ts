import { connectRouter, RouterState } from "connected-react-router";
import { AnyAction, combineReducers, Reducer } from "redux";
import auth, { AuthState } from "./auth";
import { History } from "history";

export interface RootState {
  auth: AuthState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}

const reducer = (history: History<unknown>) =>
  combineReducers({
    auth,
    router: connectRouter(history),
  });

export default reducer;
