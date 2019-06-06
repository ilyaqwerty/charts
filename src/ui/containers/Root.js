import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getTemperature, getPrecipitation, initializeDB } from '../../model/actions'
import Canvas from './Canvas'
import Form from './Form'

const StyledButton = styled.button`
  outline: none;
  display: inline-block;
  padding: .5em 1em;
  margin: 5px;
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  color: black;
  border-radius: 4px;
  font-weight: ${props => props.active ? '700' : 'inherit'};
  background: ${props => props.active ? '#A5C383' : 'transparent'};
  &:hover{ 
    background-image: linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));
  }
`
const Wrap = styled.div`
  width: inherit;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Container = styled.div`
  width: inherit;
  display: flex;
  justify-content: center;
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

  onClick = (type) => {
    const {
      yearFrom,
      yearTo
    } = this.state
    let yF = yearFrom
    let yT = yearTo
    if (yearFrom < 1881) {
      yF = 1881
    }

    if (yearTo > 2006) {
      yT = 2006
    }

    if (yearTo < yearFrom) {
      yT = yF
    }

    if (type === 'Temperature') {
      getTemperature(yF, yT)
        .then(res => {
          this.setState({ dataType: type, data: res.data, yearFrom: yF, yearTo: yT })
        })
    } else if (type === 'Precipitation') {
      getPrecipitation(yF, yT)
        .then(res => {
          this.setState({ dataType: type, data: res.data, yearFrom: yF, yearTo: yT })
        })
    }
  }

  handleChange = event => {
    const value = parseInt(event.target.value, 10) || ''
    this.setState({ [event.target.name]: value })
    return new Promise(resolve => resolve())
  }

  handleSubmit = () => {
    const {
      yearFrom,
      yearTo,
      dataType
    } = this.state
    if (dataType === 'Temperature') {
      getTemperature(yearFrom, yearTo)
        .then(res => {
          this.setState({ dataType, data: res.data })
        })
    } else if (dataType === 'Precipitation') {
      getPrecipitation(yearFrom, yearTo)
        .then(res => {
          this.setState({ dataType, data: res.data })
        })
    }
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
      <Container>
        <Wrap>
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
        </Wrap>
        <Form
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          yearFrom={yearFrom}
          yearTo={yearTo}
        />
      </Container>
      <Canvas data={data} width={800} height={600}/>
    </>
  }
}

export default connect(({ data }) => ({ data }))(Root)
