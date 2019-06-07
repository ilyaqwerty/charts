import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

import { Root } from './ui/containers'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    font-size: 16px;
  }

  .flex{
      box-shadow: none!important;
  }

  #root{
      display: flex;
      flex-direction: column;
      align-items: center;
  }
`

ReactDOM.render(<>
  <Root/>
  <GlobalStyle/>
</>, document.getElementById('root'))
