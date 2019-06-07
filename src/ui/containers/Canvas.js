import React, { Component } from 'react'

export default class Canvas extends Component {
  componentDidMount () {
    this.ctx = this.refs.canvas.getContext('2d')
    this.ctx.strokeStyle = '#000000'
    this.ctx.lineWidth = 1
    this.ctx.font = '12px Helvetica, Arial'
  }

  componentDidUpdate () {
    this.updateCanvas()
  }

  shouldComponentUpdate (nextProps, nextState) {
    const {
      data: oldData,
    } = this.props
    const {
      data
    } = nextProps

    return oldData !== data
  }

  drawDash (max, width) {
    const coords = max / 10 > 1
      ? [-30.0, -20.0, -10.0, 0.0, 10.0, 20.0, 30.0, 40.0]
      : [0.0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8, 3.2]
    const ctx = this.ctx
    coords.forEach(value => {
      const y = this.getYpos(value)
      ctx.beginPath()
      ctx.setLineDash([2, 15])
      ctx.moveTo(35, y)
      ctx.lineTo(width, y)
      ctx.stroke()
      ctx.fillText(value, 10, y + 5)
    })
    ctx.setLineDash([])
  }

  drawLabels (xStep) {
    const {
      width,
      data
    } = this.props
    const ctx = this.ctx
    ctx.textAlign = 'center'
    for (let i = 0; i < data.length; i++) {
      ctx.fillStyle = '#A5C383'
      const value = data[i]
      const x = width * 0.1 + i * xStep
      const y = this.getYpos(value)
      ctx.fillRect(x, y, 40, 16)
      ctx.fillStyle = '#000000'
      ctx.fillText(value, x + 20, y + 12)
    }
  }

  mapRange (height, min, max) {
    return function (value) {
      return height - height * 0.7 * (value - min) / (max - min)
    }
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
      this.getYpos = this.mapRange(height - 100, min, max)
      const xStep = Math.round(width * 0.8 / 12)

      const ctx = this.ctx
      ctx.clearRect(0, 0, width, height)
      this.drawDash(max, width)
      ctx.beginPath()
      data.forEach((value, i) => {
        const x = width * 0.1 + i * xStep
        const y = this.getYpos(value)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.arc(x, y, 2, 0, 2 * Math.PI, false)
        ctx.closePath()
        ctx.fill()
      })
      this.drawLabels(xStep)
    }
  }

  render () {
    const {
      width,
      height
    } = this.props
    // console.log('CANVAS RENDER', this.props.data)
    return <canvas ref="canvas" width={width} height={height}>
      rdxctfvygbhnj
    </canvas>
  }
}