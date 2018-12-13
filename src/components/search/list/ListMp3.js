import React, { Component } from 'react'

class ListMp3 extends Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <div key={`${item.url}/${item.name}`}>
            {item.name}
            <button
              data-name={item.name}
              data-url={item.url}
              onClick={this.props.handleAddToPlaylistRequest}
            >
              Add
            </button>
            <button
              data-name={item.name}
              data-url={item.url}
              onClick={this.props.handleToPlayRequest}
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
