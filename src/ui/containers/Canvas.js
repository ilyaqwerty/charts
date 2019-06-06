import React, { Component } from 'react'

export default class Canvas extends Component {
  componentDidUpdate () {
    this.updateCanvas()
  }

  updateCanvas () {
    const {
      width,
      height,
      data
    } = this.props
    if (data) {
      const min = Math.min(...data)
      const max = Math.max(...data)
      const ctx = this.refs.canvas.getContext('2d')
      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = '#000000'
      ctx.beginPath()
      const xStep = Math.round(width * 0.8 / 12)
      for (let i = 0; i < data.length; i++) {
        const value = data[i]
        const x = width * 0.1 + i * xStep
        const y = height - height * 0.8 * (value - min) / (max - min);

        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.fillText(value, x - 5, y - 5)//текст над точками
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(x, y, 4, 0, 2 * Math.PI, false)
        ctx.closePath();
        ctx.fill();
      }
      ctx.lineWidth = 1//толщина линии
    }
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