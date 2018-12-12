const initialState = {
  playlist: [],
  toPlay: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_PLAYLIST_REQUEST':
      return {
        ...state,
        playlist: [...state.playlist, action.addToPlaylist]
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
