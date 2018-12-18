import React, { Component } from 'react'
import List from './list/List'

class Playlist extends Component {
  state = { isDisplaying: false }
  componentDidMount = () => {
    this.props.onMount()
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
            toPlayRequest={this.props.toPlayRequest}
            RemoveRequest={this.props.RemoveRequest}
          />
        ) : null}
      </div>
    )
  }
}
export default Playlist
