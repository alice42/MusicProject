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

function* savePlaylist(action) {
  window.localStorage.setItem('savedPlaylist', JSON.stringify(action.results))
}

function* loadPlaylist(action) {
  const playlist = JSON.parse(window.localStorage.getItem('savedPlaylist'))
  if (playlist) {
    yield put({ type: 'LOAD_PLAYLIST', playlist })
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery('PLAYLIST_REMOVE_SONG_REQUEST', removeFromPlaylistSaga),
    yield takeEvery('PLAYLIST_ADD_SONG_REQUEST', addSongRequest),
    yield takeEvery(
      ['PLAYLIST_ADD_SONG_SUCCESS', 'PLAYLIST_REMOVE_SONG_SUCCESS'],
      savePlaylist
    ),
    yield takeEvery('PLAYLIST_INIT', loadPlaylist)
  ])
}
