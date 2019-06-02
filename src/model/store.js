import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { data } from './reducers'

const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, logger]

const init = {
  data: {
    fetching: false
  }
}

const reducer = combineReducers({
  data
})

const store = createStore(reducer, init, applyMiddleware(...middleware))

export const dispatch = store.dispatch

export default store
