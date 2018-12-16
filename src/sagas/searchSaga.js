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

function* searchSaga(action) {
  try {
    const googleApiKey = yield select(state => state.audio.search.googleApiKey)
    if (googleApiKey === null) {
      throw Error('No Google Api Key Found')
    }
    const inputValue = action.inputValue
    const data = yield call(searchGoogle, inputValue, googleApiKey)
    yield put({ type: 'GOOGLE_API_KEY_VALID', googleApiKey })
    const items = data.items
    const googleLinks = items.map(item => item.link)
    const mp3s = yield all(
      googleLinks.map(link => {
        return call(searchMp3, link)
      })
    )
    yield put({ type: 'SEARCH_SUCCESS', results: flatten(mp3s) })
  } catch (error) {
    yield put({ type: 'SEARCH_FAILURE', errorMessage: error.message })
  }
}

function* saveGoogleApiKey(action) {
  window.localStorage.setItem('googleApiKey', action.googleApiKey)
}

function* loadGoogleApiKey(action) {
  const googleApiKey = window.localStorage.getItem('googleApiKey')
  if (googleApiKey) {
    yield put({ type: 'GOOGLE_API_KEY_REQUEST', inputValue: googleApiKey })
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery('SEARCH_REQUEST', searchSaga),
    yield takeEvery('GOOGLE_API_KEY_VALID', saveGoogleApiKey),
    yield takeEvery('SEARCH_MODULE_INIT', loadGoogleApiKey)
  ])
}
