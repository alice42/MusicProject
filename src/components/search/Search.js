import React, { Component } from 'react'
import SearchInput from './input/SearchInput'
import ListMp3 from './list/ListMp3'

class Search extends Component {
  componentDidMount = () => {
    this.props.onMount()
  }

  render() {
    return (
      <div>
        <SearchInput
          onRequestFetch={this.props.onRequestFetch}
          loading={this.props.loading}
          error={this.props.error}
        />
        <ListMp3
          items={this.props.results}
          addToPlaylistRequest={this.props.addToPlaylistRequest}
          toPlayRequest={this.props.toPlayRequest}
        />
      </div>
    )
  }
}

export default Search
