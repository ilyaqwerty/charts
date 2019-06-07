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

  render () {
    const {
      yearFrom,
      yearTo,
      onChange,
      onSubmit
    } = this.props

    const errors = this.validateInputs()
    const buttonDisabled = !!(errors.yearFrom || errors.yearTo || errors.both)

    return <StyledForm onSubmit={onSubmit}>
        <Container>
          <Input
            name='yearFrom'
            value={yearFrom}
            onChange={onChange}
            error={errors.yearFrom}
          />
          <Input
            name='yearTo'
            value={yearTo}
            onChange={onChange}
            error={errors.yearTo}
          />
          <Button type='submit' disabled={buttonDisabled}>Get</Button>
        </Container>
      </StyledForm>
  }
}

