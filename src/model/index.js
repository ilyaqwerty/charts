import Data from '../dataRepository'

const D = new Data()

export function initializeDB () {
  return D.init()
    .catch(e => {
      throw e
    })
}

export function getTemperature (yearFrom, yearTo) {
  return D.getTemperature(yearFrom, yearTo)
    .catch(e => {
      throw e
    })
}

export function getPrecipitation (yearFrom, yearTo) {
  return D.getPrecipitation(yearFrom, yearTo)
    .catch(e => {
      throw e
    })
}