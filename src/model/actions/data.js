import { dispatch } from '../store'
import Data from '../../dataRepository'

export const GET_DATA_START = 'GET_DATA_START'
export const GET_DATA_OK = 'GET_DATA_OK'
export const GET_DATA_ERR = 'GET_DATA_ERR'

const D = new Data()

export function getTemperature () {
  dispatch({
    type: GET_DATA_START
  })

  return D.getTemperature()
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