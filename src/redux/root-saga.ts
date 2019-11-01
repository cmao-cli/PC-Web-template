import { call, spawn, all } from 'redux-saga/effects';
import { DemoSaga } from 'src/redux/demo/saga';

export function* RootSaga() {
  const sagas = [
    DemoSaga,
  ];

  yield all(sagas.map((saga) =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    })),
  );
}