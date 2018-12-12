import React, { Component } from 'react'
import ReactAplayer from 'react-aplayer'

class ListMp3 extends Component {
  handleAddToPlaylistRequest = event => {
    this.props.addToPlaylistRequest(event.target.value)
  }
  handleToPlayRequest = event => {
    console.log('target', event.target.dataset.name)
    this.props.toPlayRequest({
      name: event.target.dataset.name,
      url: event.target.dataset.url
    })
  }
  render() {
    return (
      <div>
        {this.props.results.map(result => (
          <div key={`${result.url}/${result.name}`}>
            {result.name}
            <button
              value={`${result.url}/${result.name}`}
              onClick={this.handleAddToPlaylistRequest}
            >
              Add
            </button>
            <button
              data-name={result.name}
              data-url={result.url}
              onClick={this.handleToPlayRequest}
            >
              Play
            </button>
          </div>
        ))}
      </div>
    )
  }
}
export default ListMp3
