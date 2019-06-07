import React from 'react'
import styled from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 20px; 
  position: relative;
`

export const StyledInput = styled.input`
  outline: none;
  padding: 2px 10px 0 2px;
  flex: 1 0 100%;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid ${props => props.error ? 'red' : '#666'} 
`

export const ErrorText = styled.div`
  color: red;
  font-size: 10px;
  position: absolute;
  bottom: -18px;
`

export const Input = props => {
  return <InputContainer>
    <StyledInput {...props} />
    <ErrorText>{props.error}</ErrorText>
  </InputContainer>
}
