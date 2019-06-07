import React, { Component } from 'react'
import { Button, Container, StyledForm } from '../styled'
import { Input } from '../components'

export default class Form extends Component {
  validateInputs () {
    const {
      yearFrom,
      yearTo
    } = this.props

    const errors = {}
    if (yearFrom < 1881) {
      errors.yearFrom = 'must be greater than or equal to 1881'
    }

    if (yearTo > 2006) {
      errors.yearTo = 'must be less than or equal to 2006'
    }

    if (yearTo < yearFrom) {
      errors.both = 'select the correct interval'
    }
    return errors
  }

  handleSubmit = event => {
    event.preventDefault()

    const {
      onSubmit
    } = this.props

    const errors = this.validateInputs()

    if (!(errors.yearFrom || errors.yearTo || errors.both)) {
      onSubmit()
    }
  }

  handleChange = async event => {
    const {
      onChange
    } = this.props
    event.preventDefault()

    await onChange(event)
    this.validateInputs()
  }

  render () {
    const {
      yearFrom,
      yearTo,
    } = this.props

    const errors = this.validateInputs()
    const buttonDisabled = !!(errors.yearFrom || errors.yearTo || errors.both)
    return <>
      <StyledForm onSubmit={this.handleSubmit}>
        <Container>
          <Input
            name='yearFrom'
            value={yearFrom}
            onChange={this.handleChange}
            error={errors.yearFrom}
          />
          <Input
            name='yearTo'
            value={yearTo}
            onChange={this.handleChange}
            error={errors.yearTo}
          />
          <Button type='submit' disabled={buttonDisabled}>Get</Button>
        </Container>
      </StyledForm>
    </>
  }
}

