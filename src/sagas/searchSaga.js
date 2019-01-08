import {
  call,
  put,
  takeEvery,
  all,
  takeLatest,
  select
} from 'redux-saga/effects'
import { searchGoogle } from '../services/google'
import { searchMp3 } from '../services/mp3'
import { flatten } from 'lodash'

const test = (items, search) => {
  // items.forEach(element => {
  //   console.log(element.name)
  // })
  return items
}

function* searchSaga(action) {
  try {
    const googleLinks = yield call(searchGoogle, action.inputValue)
    const mp3s = yield all(
      googleLinks.map(link => {
        return call(searchMp3, link)
      })
    )
    const results = test(flatten(mp3s), action.inputValue)
    yield put({ type: 'SEARCH_SUCCESS', results })
  } catch (error) {
    yield put({ type: 'SEARCH_FAILURE', errorMessage: error.message })
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery('SEARCH_REQUEST', searchSaga)])
}
