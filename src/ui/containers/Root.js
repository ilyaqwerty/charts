import React, { Component } from 'react'
import styled from 'styled-components'
import { getTemperature, getPrecipitation, initializeDB } from '../../model'
import Canvas from './Canvas'
import Form from './Form'
import {Container, Button} from '../styled'

const Wrap = styled(Container)`
  flex-direction: column;
`

export default class Root extends Component {
  constructor (props) {
    super(props)
    this.state = {
      initializing: true,
      dataType: 'Temperature',
      yearFrom: 1881,
      yearTo: 2006
    }
    initializeDB()
      .then(data => {
        this.setState({ data })
      })
  }

  validate () {
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
    return {yearFrom: yF, yearTo: yT}
  }

  onClick = (type) => {
    const {
      yearFrom,
      yearTo
    } = this.validate()

    if (type === 'Temperature') {
      getTemperature(yearFrom, yearTo)
        .then(data => {
          this.setState({ dataType: type, data, yearFrom, yearTo })
        })
    } else if (type === 'Precipitation') {
      getPrecipitation(yearFrom, yearTo)
        .then(data => {
          this.setState({ dataType: type, data, yearFrom, yearTo })
        })
    }
  }

  handleChange = event => {
    const value = parseInt(event.target.value, 10) || ''
    this.setState({ [event.target.name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const {
      yearFrom,
      yearTo,
      dataType
    } = this.state
    if (dataType === 'Temperature') {
      getTemperature(yearFrom, yearTo)
        .then(data => {
          this.setState({ dataType, data })
        })
    } else if (dataType === 'Precipitation') {
      getPrecipitation(yearFrom, yearTo)
        .then(data => {
          this.setState({ dataType, data })
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

    // console.log('ROOT RENDER', data, dataType, yearFrom, yearTo)

    return <>
      <Container>
        <Wrap>
          <Button
            onClick={() => this.onClick('Temperature')}
            active={dataType === 'Temperature'}>
            Temperature
          </Button>
          <Button
            onClick={() => this.onClick('Precipitation')}
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
