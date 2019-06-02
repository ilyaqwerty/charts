import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTemperature } from '../../model/actions'

class Root extends Component {
  constructor (props) {
    super(props)
    getTemperature()
  }

  render () {
    const {
      data
    } = this.props
    return data.fetching ? <>
      loading
    </> : <>
      loaded
    </>
  }
}

export default connect(({ data }) => ({ data }))(Root)
