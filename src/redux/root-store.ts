import {  createStore, applyMiddleware, Middleware, Store } from 'redux';
import { rootReducer, IReduxState } from './root-reducer';

export type StoreType = Store<IReduxState>;

export let _createStore =  () : Store<IReduxState> => {
  const middlewares:Middleware[] = [].filter(Boolean);

  const createStoreWithMidddleware = applyMiddleware(
    ...middlewares,
  )(createStore);

  const store:any = createStoreWithMidddleware(
    rootReducer,
  );
  return store;
};