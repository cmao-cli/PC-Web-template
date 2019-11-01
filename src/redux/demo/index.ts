import { createModel, Raw, Action } from 'rdx-model';
// example
// states
export interface DemoState {
  num:number;
}
// initial states
export const default_state:DemoState = {
  num: 0,
};
// Action && Reducer
export const demo = createModel({
  state: default_state,
  reducers: {
    'demo/add': {
      name: Raw('add_num'),
      reducer: (state, action:Action<number>) : DemoState => {
        const temp = state.num + action.payload!;
        console.log(temp);
        return Object.assign({}, state, {num: temp});
      },
    },
    'demo/minus': {
      name: Raw('minus_num'),
      reducer: (state, action:Action<number>) : DemoState => {
        const temp = state.num - action.payload!;
        return Object.assign({}, state, {num: temp});
      },
    },
  },
});

export const { add_num, minus_num } = demo.actions;