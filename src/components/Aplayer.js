import React, { Component } from 'react'
import ReactAplayer from 'react-aplayer'

class Aplayer extends Component {
  onPlay = () => {
    console.log('on play')
    this.ap.play()
  }

  onPause = () => {
    console.log('on pause')
  }

  onInit = ap => {
    this.ap = ap
  }

  render() {
    const props = {
      theme: '#F57F17',
      listFolded: false,
      listMaxHeight: '90',
      lrcType: 3,
      audio: this.props.results
    }

    return this.props.results.length ? (
      <div>
        <ReactAplayer
          {...props}
          onInit={this.onInit}
          onPlay={this.onPlay}
          onPause={this.onPause}
        />
      </div>
    ) : null
  }
}
export default Aplayer
