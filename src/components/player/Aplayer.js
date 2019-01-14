import React, { Component } from 'react'
import ReactAplayer from 'react-aplayer'

const forbiddenElements = ['input', 'textarea']

class Aplayer extends Component {
  ap: null

  componentDidMount = () => {
    document.addEventListener('keyup', this.handleKeyUp)
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount = () => {
    document.removeEventListener('keyup', this.handleKeyUp)
    document.removeEventListener('keydown', this.handleKeyDowd)
  }

  handleKeyUp = e => {
    const element = e.srcElement.localName
    if (
      e.keyCode === 32 &&
      !forbiddenElements.includes(element) &&
      this.ap &&
      this.ap.list.audios.length
    ) {
      this.ap.toggle()
    }
  }

  handleKeyDown = e => {
    if (e.keyCode === 32 && e.target == document.body) {
      e.preventDefault()
    }
  }

  onInit = ap => {
    this.ap = ap
  }

  onError = e => {
    console.log('Error with', this.ap.list.audios[0].url)
  }

  render() {
    if (this.props.toPlay !== null) {
      this.ap.list.clear()
      this.ap.addAudio(this.props.toPlay)
      this.ap.play()
    }
    const props = {
      theme: '#F57F17',
      loop: 'none'
    }

    return (
      <div>
        <ReactAplayer {...props} onError={this.onError} onInit={this.onInit} />
      </div>
    )
  }
}
export default Aplayer
