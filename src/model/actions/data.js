import { dispatch } from '../store'
import Data from '../../dataRepository'

export const INIT_START = 'INIT_START'
export const INIT_OK = 'INIT_OK'
export const INIT_ERR = 'INIT_ERR'

export const GET_DATA_START = 'GET_DATA_START'
export const GET_DATA_OK = 'GET_DATA_OK'
export const GET_DATA_ERR = 'GET_DATA_ERR'

const D = new Data()

export function initializeDB () {
  dispatch({
    type: INIT_START
  })

  return D.init()
    .then(data => {
      return dispatch({
        type: INIT_OK,
        data
      })
    })
    .catch(e => {
      return dispatch({
        type: INIT_ERR,
        data: e
      })
    })
}

export function getTemperature (yearFrom, yearTo) {
  dispatch({
    type: GET_DATA_START
  })
  return D.getTemperature(yearFrom, yearTo)
    .then(data => {
      return dispatch({
        type: GET_DATA_OK,
        data
      })
    })
    .catch(e => {
      return dispatch({
        type: GET_DATA_ERR,
        data: e
      })
    })
}

export function getPrecipitation (yearFrom, yearTo) {
  dispatch({
    type: GET_DATA_START
  })

  return D.getPrecipitation(yearFrom, yearTo)
    .then(data => {
      return dispatch({
        type: GET_DATA_OK,
        data
      })
    })
    .catch(e => {
      return dispatch({
        type: GET_DATA_ERR,
        data: e
      })
    })
}