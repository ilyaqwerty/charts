import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components'

import App from './App';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    font-size: 16px;
  };

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
    <App />
    <GlobalStyle />
</>, document.getElementById('root'));
