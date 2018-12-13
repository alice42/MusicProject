import React, { Component } from 'react'

class List extends Component {
  render() {
    const emptyPlaylist = 'Empty playlist '
    return (
      <div>
        {this.props.items.length
          ? this.props.items.map(item => (
              <div key={`${item.url}/${item.name}`}>
                {item.name}
                <button
                  data-name={item.name}
                  data-url={item.url}
                  onClick={this.props.handleToPlayRequest}
                >
                  Play
                </button>
              </div>
            ))
          : emptyPlaylist}
      </div>
    )
  }
}
export default List
