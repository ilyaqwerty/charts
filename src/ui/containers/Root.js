import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getTemperature, getPrecipitation, initializeDB } from '../../model/actions'

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
      .then(console.log)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      initializing: nextProps.data.initializing,
      ...prevState
    }
  }

  onClick = (type) => {
    const {
      dataType,
      yearFrom,
      yearTo
    } = this.state
    if (type === 'Temperature') {
      this.setState({dataType: type})
      getTemperature(yearFrom, yearTo)
        .then(console.log)
    } else if (type === 'Precipitation') {
      this.setState({dataType: type})
      getPrecipitation(yearFrom, yearTo)
        .then(console.log)
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value, 10) })
  }

  render () {
    const {
      dataType,
      yearFrom,
      yearTo
    } = this.state
    console.log(dataType, yearFrom, yearTo)
    return <>
      <Button onClick={this.onClick.bind(this, 'Temperature')} active={dataType === 'Temperature'}>Temperature</Button>
      <Button onClick={this.onClick.bind(this, 'Precipitation')} active={dataType === 'Precipitation'}>Precipitation</Button>
      <input name='yearFrom' type="number" value={this.state.yearFrom} onChange={this.handleChange}/>
      <input name='yearTo' type="number" value={this.state.yearTo} onChange={this.handleChange}/>
    </>
  }
}

export default connect(({ data }) => ({ data }))(Root)
