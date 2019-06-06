importScripts('util.js')
importScripts('DB.js')

let tPath,
  pPath

const db = new DB()

onmessage = async function (e) {
  const {
    type,
  } = e.data

  if(!tPath){
    tPath = e.data.tPath
  }

  if(!pPath){
    pPath = e.data.pPath
  }

  const tTable = await db.checkIfTableExist()
  switch (type) {
    case 'init': {
      if (!tTable) {
        const data = await get(tPath)
          .then(formatData)
        await db.createTable()
        db.setData(data)
      }
      postMessage(await db.getAllData())
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
        postMessage(data)
      }
      break
    }

    case 'getPrecipitation': {
      const {
        yearFrom,
        yearTo,
      } = e.data
      console.log('getPrecipitation', yearFrom, yearTo, pPath)
      const pTable = await db.checkIfTableExist('Precipitation')
      if (!pTable) {
        const data = await get(pPath)
          .then(formatData)
        await db.createTable('Precipitation')
        db.setData(data, 'Precipitation')
      }

      if (yearFrom === 1881 && yearTo === 2006) {
        const data = await db.getAllData('Precipitation')
        postMessage(data)
      } else {
        const data = await db.getData(yearFrom, yearTo, 'Precipitation')
        // console.log(data)
        postMessage(data)
      }
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

