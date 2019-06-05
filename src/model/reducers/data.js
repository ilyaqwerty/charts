import {
  GET_DATA_ERR,
  GET_DATA_OK,
  GET_DATA_START,
  INIT_OK,
  INIT_ERR,
  INIT_START
} from '../actions/data'

export default function (state={}, action) {
  switch (action.type) {
    case GET_DATA_START:
      return {
        fetching: true
      }
    case GET_DATA_OK:
    case GET_DATA_ERR:
      return {
        fetching: false,
      }
    case INIT_START:
      return {
        initializing: true
      }
    case INIT_OK:
    case INIT_ERR:
      return {
        initializing: false,
      }
    default:
      return state
  }
}