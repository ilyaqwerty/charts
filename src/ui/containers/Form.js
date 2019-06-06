import React, { Component } from 'react'
import styled from 'styled-components'

const ErrorText = styled.div`
  color: red;
  font-size: 10px;
  position: absolute;
  bottom: -18px;
`

const Button = styled.button`
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
  &:hover{ 
    background-image: linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));
  }
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 20px; 
  position: relative;
`

const Wrap = styled.div`
  width: inherit;
  display: flex;
  justify-content: center;
`

const SForm = styled.form`
  display: flex;
  width: 100%;
  padding: 20px;
`

const SInput = styled.input`
  outline: none;
  padding: 2px 10px 0 2px;
  flex: 1 0 100%;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid ${props => props.error ? 'red' : '#666'} 
`

const Input = props => {
  return <InputContainer>
    <SInput {...props} />
    <ErrorText>{props.error}</ErrorText>
  </InputContainer>
}

export default class Root extends Component {
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

    return <>
      <SForm onSubmit={this.handleSubmit}>
        <Wrap>
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
          <Button type='submit' disabled={errors.yearFrom || errors.yearTo || errors.both}>Get</Button>
        </Wrap>
      </SForm>
      {/*{errors.both && <ErrorText>{errors.both}</ErrorText>}*/}
    </>
  }
}

