import React from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/SearchInput'
import Aplayer from '../components/Aplayer'

const Home = () => {
  return (
    <div>
      <SearchInputConnected />
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
    results: state.audio.search.results
  }
}

const AplayerConnected = connect(aPlayerMapStateToProps)(Aplayer)

export default Home
