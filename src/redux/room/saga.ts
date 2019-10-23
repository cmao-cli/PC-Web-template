import { put, fork, take, call } from 'redux-saga/effects';
import { fetch_list, update_list } from './index';
import { fetchList } from 'src/api/fakeApi';

export function* RoomsSaga() {
  yield fork(watchFetchList);
}

function* watchFetchList() {
  try {
    yield take(fetch_list);
    const res = yield call(fetchList);
    yield put(update_list(res));
  } catch (error) {
    console.log(error);
  }
}