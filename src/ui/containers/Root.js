import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTemperature, getPrecipitation } from '../../model/actions'

class Root extends Component {
  constructor (props) {
    super(props)
    getTemperature()
      .then(console.log)
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
