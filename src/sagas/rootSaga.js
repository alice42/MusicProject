import { fork } from 'redux-saga/effects'
import searchSaga from './searchSaga'
import playlistSaga from './playlistSaga'

function* rootSaga() {
  yield [fork(searchSaga), fork(playlistSaga)]
}
export default rootSaga
