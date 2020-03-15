import { combineReducers, createStore } from "redux";
import { colors } from "./colors/reducers";

const rootReducer = combineReducers({
  colors
});

export type PaletteerState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
