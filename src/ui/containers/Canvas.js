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
    const {
      width,
      height
    } = this.props
    console.log('CANVAS RENDER', this.props.data)
    return <canvas ref="canvas" width={width} height={height}>
      rdxctfvygbhnj
    </canvas>
  }
}