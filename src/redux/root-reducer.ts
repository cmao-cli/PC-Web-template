import { combineReducers } from 'redux';
import { IDemoState, demo } from 'src/redux/demo';
export interface IReduxState {
  demo:IDemoState;
}

export const rootReducer = combineReducers<IReduxState>({
  demo:demo.reducer,
});