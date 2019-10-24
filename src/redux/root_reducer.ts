import { combineReducers } from 'redux';
import { DemoState, demo } from 'src/router/index/model';


export interface ReduxState {
  readonly demoState:DemoState;
}

export const root_reducer = combineReducers<ReduxState>({
  demoState: demo.reducer,
});