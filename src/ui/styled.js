import styled from 'styled-components'

export const Button = styled.button`
  outline: none;
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  color: black;
  border-radius: 4px;
  
  font-weight: ${props => props.active ? '700' : 'inherit'};
  background: ${props => props.active ? '#A5C383' : 'transparent'};
  
  &:disabled{
    background: #aaa;
    cursor: default;
    color: #444
  }
  &:hover:enabled{ 
    background: #A5C383;
  }
`

export const StyledForm = styled.form`
  display: flex;
  width: 100%;
  padding: 20px;
`

export const Container = styled.div`
  width: inherit;
  display: flex;
  justify-content: center;
`
