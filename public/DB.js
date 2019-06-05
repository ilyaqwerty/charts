const DBName = 'Charts'

class DB {
  init () {
    this.version = 1
    this.isDataExist = true

    return new Promise((resolve, reject) => {
      this.request = indexedDB.open(DBName, this.version)

      this.request.onupgradeneeded = e => {
        this.isDataExist = false
        this.db = e.target.result
        const t = this.db.createObjectStore('Temperature')
        const p = this.db.createObjectStore('Precipitation')
        /*t.createIndex('year', 'year', { unique: false })
        p.createIndex('year', 'year', { unique: false })*/
      }

      this.request.onsuccess = e => resolve(this.onSuccess(e))

      this.request.onerror = e => reject(this.onError(e))
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