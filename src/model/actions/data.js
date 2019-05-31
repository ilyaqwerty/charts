import {dispatch} from '../store'

export const GET_DATA_START = 'GET_DATA_START'
export const GET_DATA_OK = 'GET_DATA_OK'
export const GET_DATA_ERR = 'GET_DATA_ERR'

const someAsyncFunction = async () => {
    return await new Promise(r => setTimeout(r, 1000))
}

export function dataActionCreator () {
    dispatch({
        type: GET_DATA_START
    })

    return someAsyncFunction()
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