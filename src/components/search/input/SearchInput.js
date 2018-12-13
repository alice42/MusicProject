import React, { Component } from 'react'

class SearchInput extends Component {
  render() {
    return (
      <div>
        {this.props.error ? <label>Error: {this.props.error}</label> : null}
        <input type="text" onChange={this.props.handleOnChange} />
        {this.props.loading ? (
          <button disabled>Searching...</button>
        ) : (
          <button onClick={this.props.handleRequestFetch}>Search</button>
        )}
      </div>
    )
  }
}

export default SearchInput
