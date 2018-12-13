import React, { Component } from 'react'
import SearchInput from './input/SearchInput'
import ListMp3 from './list/ListMp3'

class Search extends Component {
  state = { inputValue: null }

  handleOnChange = event => {
    this.setState({ inputValue: event.target.value })
  }
  handleRequestFetch = () => {
    this.props.onRequestFetch(this.state.inputValue)
  }

  handleAddToPlaylistRequest = event => {
    this.props.addToPlaylistRequest({
      name: event.target.dataset.name,
      url: event.target.dataset.url
    })
  }
  handleToPlayRequest = event => {
    this.props.toPlayRequest({
      name: event.target.dataset.name,
      url: event.target.dataset.url
    })
  }

  render() {
    return (
      <div>
        <SearchInput
          loading={this.props.loading}
          error={this.props.error}
          handleOnChange={this.handleOnChange}
          handleRequestFetch={this.handleRequestFetch}
        />
        <ListMp3
          items={this.props.results}
          handleAddToPlaylistRequest={this.handleAddToPlaylistRequest}
          handleToPlayRequest={this.handleToPlayRequest}
        />
      </div>
    )
  }
}

export default Search
