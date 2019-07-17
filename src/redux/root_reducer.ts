import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { createModel, Raw, Action } from './model';
// example
export interface DemoState {
  num:number
}
export const default_state:DemoState = {
  num: 0,
};
export const demo = createModel({
  'demo/add': {
    name: Raw('add_num'),
    reducer: (state:DemoState, action:Action<number>) : DemoState => {
      const temp = state.num + action.payload;
      return Object.assign({}, state, {num: temp});
    },
  },
  'demo/minus': {
    name: Raw('minus_num'),
    reducer: (state:DemoState, action:Action<number>) : DemoState => {
      const temp = state.num - action.payload;
      return Object.assign({}, state, {num: temp});
    },
  }
});

export interface ReduxState {
  readonly demoState:DemoState;
}

export const root_reducer = combineReducers<ReduxState>({
  demoState: handleActions(demo.reducers, default_state),
});

export const { add_num } = demo.actions;
export const { minus_num } = demo.actions;