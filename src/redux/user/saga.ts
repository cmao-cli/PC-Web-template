import { put, fork, take, call } from 'redux-saga/effects';
import { updateUser, fetchUser } from './index';
import { fetchUserInfo } from 'src/api/fakeApi';

export function* UserSaga() {
  yield fork(watchFetchUserInfo);
}

function* watchFetchUserInfo() {
  try {
    yield take(fetchUser);   
    const res = yield call(fetchUserInfo);
    yield put(updateUser(res));
  } catch (error) {
    console.log('error is', error);
  }
}
