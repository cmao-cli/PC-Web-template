import { combineReducers } from 'redux';
import { DemoState, demo } from '../router/index/redux';
import { RoomState, room_model } from 'src/redux/room';
import { UserState, user_model} from 'src/redux/user';


export type ReduxState = Readonly<{
  demoState:DemoState;
  RoomState:RoomState;
  userState:UserState;
}>;

export const root_reducer = combineReducers<ReduxState>({
  demoState: demo.reducer,
  RoomState: room_model.reducer,
  userState: user_model.reducer,
});