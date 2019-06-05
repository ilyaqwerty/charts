const TEMPERATURE_PATH = process.env.REACT_APP_TEMPERATURE_PATH
const PRECIPITATION_PATH = process.env.REACT_APP_PRECIPITATION_PATH

export default class Data {
  constructor () {
    this.worker = new Worker('worker.js')
    this.worker.postMessage({ type: 'init', tPath: TEMPERATURE_PATH, pPath: PRECIPITATION_PATH })
    this.init = () => new Promise(resolve => {
      this.worker.onmessage = (e) => {
        return resolve(e.data)
      }
    })
  }

  getTemperature (yearFrom = 1881, yearTo = 2006) {
    return new Promise(resolve => {
      this.worker.postMessage({ type: 'getTemperature', table: 'Temperature', yearFrom, yearTo })
      this.worker.onmessage = (e) => {
        return resolve(e.data)
      }
    })
  }

  getPrecipitation (yearFrom = 1881, yearTo = 2006) {
    return new Promise(resolve => {
      this.worker.postMessage({ type: 'getPrecipitation', table: 'Precipitation', yearFrom, yearTo })
      this.worker.onmessage = (e) => {
        return resolve(e.data)
      }
    })
  }
}
