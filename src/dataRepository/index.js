import { get } from '../fetch'

// get methods that request data, then run worker to set data to indexedDB while redux receives meta-data

const TEMPERATURE_PATH = process.env.REACT_APP_TEMPERATURE_PATH
const PRECIPITATION_PATH = process.env.REACT_APP_PRECIPITATION_PATH

export default class Data {
  constructor () {
    this.isTfetched = false
    this.isPfetched = false
    this.worker = new Worker('worker.js')
  }

  getTemperature (yearFrom = 1881, yearTo = 2006) {
    if (this.isTfetched) {

    } else {
      console.log(process.env)
      return get(TEMPERATURE_PATH)
        .then(data => {
          //set data to indexedDB
          this.worker.postMessage(data);
          console.log('Message posted to worker');
          this.isTfetched = true
        })
    }
  }
}
