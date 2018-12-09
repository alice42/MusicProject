import { fork } from 'redux-saga/effects'
import searchSaga from './searchSaga'

function* rootSaga() {
  yield [fork(searchSaga)]
}
export default rootSaga
