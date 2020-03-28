/* eslint-disable */
let version = 0

class DB {
  constructor () {
    this.DBName = 'Charts'
    this.version = 0
    this.Temperature = false
    this.Precipitation = false
  }

  checkIfTableExist (table = 'Temperature') {
    const request = indexedDB.open(this.DBName)
    return new Promise((resolve, reject) => {
      request.onsuccess = e => {
        this.db = e.target.result
        version = e.target.result.version
        const isExist = e.target.result.objectStoreNames.contains(table)
        !isExist && e.target.result.close()
        resolve(isExist)
      }
      request.onerror = e => this.onError(e)
    })
  }

  createTable (table = 'Temperature') {
    const request = indexedDB.open(this.DBName, version + 1)
    return new Promise((resolve, reject) => {

      request.onupgradeneeded = e => {
        this.db = e.target.result
        this.db.createObjectStore(table)
      }

      request.onsuccess = e => {
        version = parseInt(e.target.result.version)
        resolve(this.onSuccess(e))
      }

      request.onerror = e => reject(this.onError(e))
    })
  }

  onError (e, act = 'init') {
    console.log(act, 'error', e)
  }

  onSuccess (e, act = 'init') {
    console.log(act, 'success')
    this.db = e.target.result
  }

  setData (data, table = 'Temperature') {
    const request = this.db.transaction(table, 'readwrite').objectStore(table)
    return new Promise((resolve, reject) => {

      for (let key in data) {
        request.add(data[key], key)
      }

      request.onsuccess = e => resolve(this.onSuccess(e, 'set data'))

      request.onerror = e => reject(this.onError(e, 'set data'))
    })
  }

  getData (yearFrom = 1881, yearTo = 2006, table = 'Temperature') {
    const getCursorRequest = this.db.transaction(table, 'readonly').objectStore(table).openCursor()
    return new Promise((resolve, reject) => {
      const items = []
      getCursorRequest.onsuccess = e => {
        const cursor = e.target.result
        if (cursor) {
          const itemYear = cursor.key.substring(0, 4) - 0
          if (itemYear >= yearFrom && itemYear <= yearTo) {
            items.push(cursor.value)
          }
          if (itemYear <= yearTo) {
            cursor.continue()
          } else {
            resolve(items)
          }
        } else {
          console.log('Exhausted all documents')
          resolve(items)
        }
      }
    })
  }

  getAllData (table = 'Temperature') {
    const request = this.db.transaction(table, 'readonly').objectStore(table).getAll()
    return new Promise((resolve, reject) => {
      request.onsuccess = e => resolve(e.target.result)
      request.onerror = e => reject(this.onError(e, 'set data'))
    })
  }
}