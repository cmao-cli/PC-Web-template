// 定义actions和reducer
import { createModel, Raw, Action } from 'rdx-model';
import { createSelector } from 'reselect';
import { ReduxState } from '../root_reducer';

export type Room = {
  id:number;
  name:string;
  description:string;
}
// states
export type RoomState = {
  list:Room[]
  name:string;
}

// initial states
export const default_state:RoomState = {
  list:[],
  name:''
};

// Action && Reducer
export const room_model = createModel({
  state: default_state,
  reducers: {
    // 按照顺序输写，所有的reducer放在前面
    'room/update': {
      name: Raw('update_list'),
      reducer: (state:RoomState, action:Action<Partial<RoomState>>) : RoomState => {
        // 使用object spread 代替 object.assign
        return { ...state, list: (action.payload as []) }
        // return Object.assign({}, state, { list: action.payload });
      }
    },
    'room/fetch_list': {
      name: Raw('fetch_list')
    },
  }
});

// 简单的selector定义在相关的model中
export const selectUserReservation = (state:ReduxState) => state.userState.reservationId;
export const selectRoomList = (state:ReduxState) => state.RoomState.list;
export const selectUserRoom = createSelector(
  selectUserReservation, selectRoomList,
  (userReservationId, roomList) => roomList.find(room => room.id === userReservationId)
);

export const { update_list, fetch_list } = room_model.actions;