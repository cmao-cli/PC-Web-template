import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { DemoState, demo, default_state } from '../router/index/redux';


export interface ReduxState {
  readonly demoState:DemoState;
}

export const root_reducer = combineReducers<ReduxState>({
  demoState: handleActions(demo.reducers, default_state),
});