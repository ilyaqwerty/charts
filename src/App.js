import React, { Component } from 'react'
import {Provider} from 'react-redux'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import store from './model/store'
import {Root} from './ui/containers'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
        <Switch>
          <Route exact path='/' component={Root} />
        </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
