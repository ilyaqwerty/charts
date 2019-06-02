import {
  GET_DATA_ERR,
  GET_DATA_OK,
  GET_DATA_START
} from '../actions/data'

export default function (state, action) {
  switch (action.type) {
    case GET_DATA_START:
      return {
        fetching: true
      }
    case GET_DATA_OK:
      return {
        fetching: false,
      }
    case GET_DATA_ERR:
      return {
        fetching: false,
      }
    default:
      return state
  }
}