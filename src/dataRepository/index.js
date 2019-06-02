import { get } from './fetch'

// get methods that request data, then run worker to set data to indexedDB while redux receives meta-data

class Data {
  constructor () {
    this.isTfetched = false
    this.isPfetched = false
  }
}
