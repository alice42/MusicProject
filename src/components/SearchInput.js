import React, { Component } from 'react'

class SearchInput extends Component {
  state = { inputValue: null }
  handleRequestFetch = () => {
    this.props.onRequestFetch(this.state.inputValue)
  }
  handleOnChange = event => {
    this.setState({ inputValue: event.target.value })
  }
  render() {
    const { loading, onRequestFetch, error } = this.props
    return (
      <div>
        {error ? <label>Error: {error}</label> : null}
        <input type="text" onChange={this.handleOnChange} />
        {loading ? (
          <button disabled>Searching...</button>
        ) : (
          <button onClick={this.handleRequestFetch}>Search</button>
        )}
      </div>
    )
  }
}

export default SearchInput
