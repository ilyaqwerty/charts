import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getTemperature, getPrecipitation, initializeDB } from '../../model/actions'
import Canvas from './Canvas'

const StyledButton = styled.button`
  font-weight: ${props => props.active ? '700' : 'inherit'}
`

const Button = props => {
  return <StyledButton {...props}>{props.children}</StyledButton>
}

const Input = props => {
  return <Input {...props} />
}

class Root extends Component {
  constructor (props) {
    super(props)
    this.state = {
      initializing: true,
      dataType: 'Temperature',
      yearFrom: 1881,
      yearTo: 2006
    }
    initializeDB()
      .then(res => {
        this.setState({ data: res.data })
      })
  }

  shouldComponentUpdate (nextProps, nextState) {
    const {
      data: oldData
    } = this.state
    const {
      data
    } = nextState

    return oldData !== data
  }

  onClick = (type) => {
    const {
      dataType,
      yearFrom,
      yearTo
    } = this.state
    // console.log('onClick')
    if (type === 'Temperature') {
      getTemperature(yearFrom, yearTo)
        .then(res => {
          this.setState({ dataType: type, data: res.data })
        })
    } else if (type === 'Precipitation') {
      getPrecipitation(yearFrom, yearTo)
        .then(res => {
          this.setState({ dataType: type, data: res.data })
        })
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value, 10) })
  }

  render () {
    const {
      dataType,
      yearFrom,
      yearTo,
      data
    } = this.state
    console.log('ROOT RENDER', data, dataType, yearFrom, yearTo)
    return <>
      <Button
        onClick={this.onClick.bind(this, 'Temperature')}
        active={dataType === 'Temperature'}>
        Temperature
      </Button>
      <Button
        onClick={this.onClick.bind(this, 'Precipitation')}
        active={dataType === 'Precipitation'}>
        Precipitation
      </Button>
      {/*<input name='yearFrom' type="number" value={this.state.yearFrom} onChange={this.handleChange}/>*/}
      {/*<input name='yearTo' type="number" value={this.state.yearTo} onChange={this.handleChange}/>*/}
      <Canvas data={data} width={800} height={600}/>
    </>
  }
}

export default connect(({ data }) => ({ data }))(Root)
