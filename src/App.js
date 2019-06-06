import React, { Component } from 'react'
import {Provider} from 'react-redux'
import store from './model/store'
import {Root} from './ui/containers'


class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    )
  }
}

export default App;
