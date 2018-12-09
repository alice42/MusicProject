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

function* searchSaga(action) {
  try {
    const inputValue = action.inputValue
    const data = yield call(searchGoogle, inputValue)
    const items = data.items
    const googleLinks = items.map(item => item.link)
    const mp3s = yield all(
      googleLinks.map(link => {
        return call(searchMp3, link)
      })
    )
    yield put({ type: 'SEARCH_SUCCESS', results: mp3s.flat() })
  } catch (error) {
    yield put({ type: 'SEARCH_FAILURE', errorMessage: error.message })
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery('SEARCH_REQUEST', searchSaga)])
}
