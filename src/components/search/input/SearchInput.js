import React, { Component } from 'react'

class SearchInput extends Component {
  state = { inputValue: null }

  handleOnChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleRequestFetch = () => {
    this.props.onRequestFetch(this.state.inputValue)
  }

  handleKeyUp = event => {
    if (event.keyCode === 13) {
      this.props.onRequestFetch(this.state.inputValue)
    }
  }

  render() {
    return (
      <div>
        {this.props.error ? (
          <div>
            <label>Error: {this.props.error}</label>
          </div>
        ) : null}
        <input
          type="text"
          onChange={this.handleOnChange}
          onKeyUp={this.handleKeyUp}
        />
        {this.props.loading ? (
          <button disabled>Searching...</button>
        ) : (
          <button onClick={this.handleRequestFetch}>Search</button>
        )}
      </div>
    )
  }
}

export default SearchInput
