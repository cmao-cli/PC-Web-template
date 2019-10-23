import { call, spawn, all } from 'redux-saga/effects';
import { RoomsSaga } from 'src/redux/room/saga';
import { UserSaga } from 'src/redux/user/saga';

export function* RootSaga() {
  const sagas = [
    RoomsSaga,
    UserSaga
  ];

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    }))
  );
}



