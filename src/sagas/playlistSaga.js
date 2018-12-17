import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import { isEqual } from 'lodash'

function* removeFromPlaylistSaga(action) {
  const playlist = yield select(state => state.audio.playlist.playlist)
  const toRemove = action.toRemove
  const newPlaylist = playlist.filter(item => !isEqual(item, toRemove))
  yield put({ type: 'PLAYLIST_REMOVE_SONG_SUCCESS', results: newPlaylist })
}

function* addSongRequest(action) {
  const playlist = yield select(state => state.audio.playlist.playlist)
  const toAdd = action.addToPlaylist
  const double = playlist.find(item => isEqual(item, toAdd))
  if (!double) {
    yield put({
      type: 'PLAYLIST_ADD_SONG_SUCCESS',
      results: [...playlist, toAdd]
    })
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery('PLAYLIST_REMOVE_SONG_REQUEST', removeFromPlaylistSaga),
    yield takeEvery('PLAYLIST_ADD_SONG_REQUEST', addSongRequest)
  ])
}
