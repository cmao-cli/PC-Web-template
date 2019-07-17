import { Action as OriginAction, createAction } from 'redux-actions';

export const Raw = <T extends string>(a:T) => a;
export type FirstArgument<T> = T extends (arg1:infer U, ...args:any[]) => any ? U : any;
export type SecondArgument<T> = T extends (arg1:any, arg2:infer U, ...args:any[]) => any ? U : any;
type PickActionType<T extends Action<any>> = T extends Action<infer U> ? U : any;
export const createModel = <U extends {[name:string]:{
  name:string;
  reducer:(state:any, action:Action<any>) => any;
}}>(models:U) : {
  actions:{[key in {[k in keyof U]:U[k]['name']}[keyof U]]:CreateAction<PickActionType<SecondArgument<{
    [k in {[kk in keyof U]:U[kk]['name']}[keyof U]]:{
      [p in keyof U]: U[p]['name'] extends k ? U[p]['reducer'] : never
    }[keyof U]
  }[key]>>>};
  reducers:{[key in keyof U]:U[key]['reducer']}
} => {
  const _reducers = {} as any;
  const _actions = {} as any;
  Object.keys(models).map((item, key) => {
    _actions[models[item].name] = create_action(item);
  });
  Object.keys(models).map((item, key) => {
    _reducers[item] = models[item].reducer;
  });
  return {
    actions: _actions,
    reducers: _reducers,
  };
};

export type CreateAction<Payload> = (payload:Payload) => Action<Payload>;
export type ApiCallBack = {
  callback?:(status:number, error_code?:string) => void;
};
export interface Action<Payload = undefined> extends OriginAction<Payload> {
  readonly type:string;
  readonly payload?:Payload;
}

export function create_action(action_type:string) : () => Action;
export function create_action<Payload>(
    action_type:string,
) : (payload:Payload) => Action<Payload>;
export function create_action<Payload>(
    action_type:string,
    payloadCreator?:(...args:Payload[keyof Payload][]) => Payload,
) : (payload?:Payload) => Action<Payload|undefined> {
  if (payloadCreator) {
    return (createAction(action_type, payloadCreator) as (payload:Payload) => Action<Payload>);
  } else {
    return (createAction(action_type, (p:Payload) => p) as (payload?:Payload) => Action<Payload>);
  }
}