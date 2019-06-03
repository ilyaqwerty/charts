onmessage = async function (e) {
  const {
    type
  } = e.data
  switch (type) {
    case 'init': {
      const db = new DB()
      await db.init()
      if (db.isDataExist) {
        postMessage('success')
      } else {
        const {
          tPath,
        } = e.data
        const data = await get(tPath)
        postMessage(data)
        db.setData(data)
      }
      break
    }

    case 'getTemperature': {
      const {
        yearFrom,
        yearTo
      } = e.data
      console.log('getTemperature', yearFrom, yearTo)
      postMessage('sdfds')
      break
    }

    case 'getPrecipitation': {
      const {
        yearFrom,
        yearTo
      } = e.data
      console.log('getPrecipitation', yearFrom, yearTo)
      break
    }
    default: break
  }
}

function get (url, data, ...rest) {
  console.log('GET', url, data, rest)

  const GET = {
    method: 'GET'
  }

  return fetch(url, GET)
    .then(res => {
      console.log(res)
      return res.json()
    })
    .catch(e => {
      console.log(e)
      throw e
    })
}

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
        this.db.createObjectStore('Temperature', { keyPath: 't' })
        this.db.createObjectStore('Precipitation', { keyPath: 't' })
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
    return new Promise((resolve, reject) => {
      const request = this.db.transaction(table, 'readwrite').objectStore(table)
      for (let i in data) {
        request.add(data[i])
      }
      this.request.onsuccess = e => resolve(this.onSuccess(e, 'set data'))

      this.request.onerror = e => reject(this.onError(e, 'set data'))
    })
  }
}