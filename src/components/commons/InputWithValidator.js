import React, { Component } from 'react'

class InputWithValidator extends Component {
  state = { inputValue: '' }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.inputValue !== this.props.defaultValue &&
      this.state.inputValue === '' &&
      this.props.defaultValue !== null
    ) {
      this.setState({ inputValue: this.props.defaultValue })
    }
  }

  handleOnChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleOnClick = () => {
    this.props.onClick(this.state.inputValue)
  }

  render() {
    const { error, loading } = this.props
    return (
      <div>
        {error ? <label>Error: {error}</label> : null}
        <input
          type="text"
          onChange={this.handleOnChange}
          value={this.state.inputValue}
        />
        <button onClick={this.handleOnClick} disabled={loading}>
          Ok
        </button>
      </div>
    )
  }
}

export default InputWithValidator
