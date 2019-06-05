importScripts('util.js')
importScripts('DB.js')

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
          .then(formatData)
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
      if (yearFrom === 1881 && yearTo === 2006) {
        const data = await db.getAllData()
        postMessage(data)
      } else {
        const data = await db.getData(yearFrom, yearTo)
        console.log(data)
        postMessage(data)
      }
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

