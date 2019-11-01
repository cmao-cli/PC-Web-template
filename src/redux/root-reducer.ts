import { combineReducers } from 'redux';
import { DemoState, demo } from '../pages/index/redux';
export interface ReduxState {
  readonly demoState:DemoState;
}

export const root_reducer = combineReducers<ReduxState>({
  demoState: demo.reducer,
});