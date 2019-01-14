import React, { Component } from 'react'
import { randomColor } from '../../../utils'

class List extends Component {
  handleToPlayRequest = event => {
    this.props.toPlayRequest({
      name: event.target.dataset.name,
      url: event.target.dataset.url
    })
  }

  handleRemoveRequest = event => {
    this.props.RemoveRequest({
      name: event.target.dataset.name,
      url: event.target.dataset.url
    })
  }

  render() {
    const emptyPlaylist = 'Empty playlist '
    return (
      <div>
        {this.props.items.length
          ? this.props.items.map(item => (
              <div
                key={`${item.url}/${item.name}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #eee',
                  backgroundColor: randomColor()
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
                    onClick={this.handleRemoveRequest}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          : emptyPlaylist}
      </div>
    )
  }
}
export default List
