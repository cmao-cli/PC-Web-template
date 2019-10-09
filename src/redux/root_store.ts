// tslint:disable-next-line:no-unused-variable
import {  createStore, applyMiddleware, Middleware, Store } from 'redux';
import { root_reducer, ReduxState } from './root_reducer';

export type StoreType = Store<ReduxState>;

export let create_store =  () : Store<ReduxState> => {
  const middlewares:Middleware[] = [].filter(Boolean);

  const create_store_with_midddleware = applyMiddleware(
    ...middlewares,
  )(createStore);

  const store:any = create_store_with_midddleware(
    root_reducer,
    DEBUG && (<any>window).__REDUX_DEVTOOLS_EXTENSION__
      && (<any>window).__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store;
};