import React from 'react'
import { connect } from 'react-redux'
import Playlist from '../components/playlist'
import Search from '../components/search'
import Aplayer from '../components/player'

const Home = () => {
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <div
        style={{
          width: '50%',
          height: '-webkit-fill-available',
          overflow: 'scroll'
        }}
      >
        <SearchConnected />
      </div>
      <div style={{ width: '50%' }}>
        <PlaylistConnected />
        <AplayerConnected />
      </div>
    </div>
  )
}

//Playlist
const playlistMapStateToProps = state => {
  return {
    playlist: state.audio.playlist.playlist
  }
}
const playlistMapDispatchToProps = dispatch => {
  return {
    toPlayRequest: toPlay => dispatch({ type: 'TO_PLAY_REQUEST', toPlay }),
    RemoveRequest: toRemove =>
      dispatch({ type: 'PLAYLIST_REMOVE_SONG_REQUEST', toRemove })
  }
}

const PlaylistConnected = connect(
  playlistMapStateToProps,
  playlistMapDispatchToProps
)(Playlist)

//Search
const searchMapStateToProps = state => {
  return {
    loading: state.audio.search.loading,
    error: state.audio.search.errorMessage,
    results: state.audio.search.results,
    toPlay: state.audio.playlist.toPlay,
    playlist: state.audio.playlist.playlist,
    googleApiKey: state.audio.search.googleApiKey
  }
}

const searchMapDispatchToProps = dispatch => {
  return {
    onRequestFetch: inputValue =>
      dispatch({ type: 'SEARCH_REQUEST', inputValue }),
    addToPlaylistRequest: addToPlaylist =>
      dispatch({ type: 'PLAYLIST_ADD_SONG_REQUEST', addToPlaylist }),
    toPlayRequest: toPlay => dispatch({ type: 'TO_PLAY_REQUEST', toPlay }),
    onMount: () => dispatch({ type: 'SEARCH_MODULE_INIT' }),
    onChangeGoogleApiKey: inputValue =>
      dispatch({ type: 'GOOGLE_API_KEY_REQUEST', inputValue })
  }
}

const SearchConnected = connect(
  searchMapStateToProps,
  searchMapDispatchToProps
)(Search)

// Player
const aPlayerMapStateToProps = state => {
  return {
    toPlay: state.audio.playlist.toPlay
  }
}

const AplayerConnected = connect(aPlayerMapStateToProps)(Aplayer)

export default Home
