import React from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/SearchInput'
import Aplayer from '../components/Aplayer'
import ListMp3 from '../components/ListMp3'

const Home = () => {
  return (
    <div>
      <SearchInputConnected />
      <ListMp3Connected />
      <AplayerConnected />
    </div>
  )
}

const searchInputMapStateToProps = state => {
  return {
    loading: state.audio.search.loading,
    error: state.audio.search.errorMessage
  }
}

const searchInputMapDispatchToProps = dispatch => {
  return {
    onRequestFetch: inputValue =>
      dispatch({ type: 'SEARCH_REQUEST', inputValue })
  }
}

const SearchInputConnected = connect(
  searchInputMapStateToProps,
  searchInputMapDispatchToProps
)(SearchInput)

const aPlayerMapStateToProps = state => {
  return {
    toPlay: state.audio.playlist.toPlay
  }
}

const AplayerConnected = connect(aPlayerMapStateToProps)(Aplayer)

const listMp3MapStateToProps = state => {
  return {
    results: state.audio.search.results,
    toPlay: state.audio.playlist.toPlay
  }
}
const ListMp3MapDispatchToProps = dispatch => {
  return {
    addToPlaylistRequest: addToPlaylist =>
      dispatch({ type: 'ADD_TO_PLAYLIST_REQUEST', addToPlaylist }),
    toPlayRequest: toPlay => dispatch({ type: 'TO_PLAY_REQUEST', toPlay })
  }
}

const ListMp3Connected = connect(
  listMp3MapStateToProps,
  ListMp3MapDispatchToProps
)(ListMp3)

export default Home
