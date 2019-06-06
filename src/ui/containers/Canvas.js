import React, { Component } from 'react'

export default class Canvas extends Component {
  componentDidMount () {
    this.updateCanvas()
  }

  updateCanvas () {
    const ctx = this.refs.canvas.getContext('2d')
    ctx.fillRect(0, 0, 100, 100)
  }

  render () {
    console.log('CANVAS RENDER', this.props.data)
    return <canvas ref="canvas" width="600" height="400">
      rdxctfvygbhnj
    </canvas>
  }
}