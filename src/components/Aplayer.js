import React, { Component } from 'react'
import ReactAplayer from 'react-aplayer'

class Aplayer extends Component {
  onInit = ap => {
    this.ap = ap
  }

  render() {
    if (this.props.toPlay !== null) {
      this.ap.list.clear()
      this.ap.addAudio(this.props.toPlay)
      this.ap.play()
    }
    const props = {
      theme: '#F57F17'
    }

    return (
      <div>
        <ReactAplayer {...props} onInit={this.onInit} />
      </div>
    )
  }
}
export default Aplayer
