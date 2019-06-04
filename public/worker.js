onmessage = async function (e) {
  const {
    type
  } = e.data

  const db = new DB()
  await db.init()

  switch (type) {
    case 'init': {
      if (!db.isDataExist) {
        const {
          tPath,
        } = e.data
        const data = await get(tPath)
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
      const data = await db.getData()
      postMessage(data)
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
    const request = this.db.transaction(table, 'readwrite').objectStore(table)
    return new Promise((resolve, reject) => {
      for (let i in data) {
        request.add(data[i])
      }
      request.onsuccess = e => resolve(this.onSuccess(e, 'set data'))

      request.onerror = e => reject(this.onError(e, 'set data'))
    })
  }

  getData (yearFrom = 1881, yearTo = 2006, table = 'Temperature') {
    const request = this.db.transaction(table, 'readonly').objectStore(table).getAll()
    return new Promise((resolve, reject) => {
      request.onsuccess = e => {
        resolve(e.target.result)
      }
      request.onerror = e => reject(this.onError(e, 'set data'))
    })
  }
}