import React, { Component } from 'react'
import List from './list/List'

class Playlist extends Component {
  state = { isDisplaying: false }

  handleToPlayRequest = event => {
    this.props.toPlayRequest({
      name: event.target.dataset.name,
      url: event.target.dataset.url
    })
  }
  handleDisplayClick = () => {
    this.setState({ isDisplaying: !this.state.isDisplaying })
  }

  render() {
    const { isDisplaying } = this.state
    return (
      <div>
        <button onClick={this.handleDisplayClick}>
          {isDisplaying ? 'Close Playlist' : 'Display Playlist'}
        </button>
        {isDisplaying ? (
          <List
            items={this.props.playlist}
            handleToPlayRequest={this.handleToPlayRequest}
          />
        ) : null}
      </div>
    )
  }
}
export default Playlist
