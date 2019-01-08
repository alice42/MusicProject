import React, { Component } from 'react'

class ListMp3 extends Component {
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
        {this.props.items.map(item => (
          <div
            key={`${item.url}/${item.name}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #eee'
            }}
          >
            <div>{item.name}</div>
            <div>
              <button
                data-name={item.name}
                data-url={item.url}
                onClick={this.handleToPlayRequest}
              >
                Play
              </button>
              <button
                data-name={item.name}
                data-url={item.url}
                onClick={this.handleAddToPlaylistRequest}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
export default ListMp3
