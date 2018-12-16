import React, { Component } from 'react'
import SearchInput from './input/SearchInput'
import ListMp3 from './list/ListMp3'
import GoogleApiKey from '../commons/InputWithValidator'

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
        <GoogleApiKey
          onClick={this.props.onChangeGoogleApiKey}
          defaultValue={this.props.googleApiKey}
          error={false}
          loading={false}
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
