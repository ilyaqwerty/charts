import React, { Component } from 'react'
import { connect } from 'react-redux'

class Root extends Component {
  render () {
    return <>
      lksndfsd
    </>
  }
}

export default connect(({ connection }) => ({ connection }))(Root)
