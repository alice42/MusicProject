const initialState = {
  playlist: [],
  toPlay: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYLIST_ADD_SONG_SUCCESS':
    case 'PLAYLIST_REMOVE_SONG_SUCCESS':
      return {
        ...state,
        playlist: [...action.results]
      }
    case 'TO_PLAY_REQUEST':
      return {
        ...state,
        toPlay: action.toPlay
      }
    default:
      return state
  }
}

export default reducer
