importScripts('util.js')
importScripts('DB.js')
importScripts('get.js')

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
      const data = await db.getAllData()
        .then(mapData)
      postMessage(data)
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
          .then(mapData)
        postMessage(data)
      } else {
        const data = await db.getData(yearFrom, yearTo)
          .then(mapData)
        postMessage(data)
      }

      break
    }

    case 'getPrecipitation': {
      const {
        yearFrom,
        yearTo,
      } = e.data

      console.log('getPrecipitation', yearFrom, yearTo)

      const pTable = await db.checkIfTableExist('Precipitation')

      if (!pTable) {
        const data = await get(pPath)
          .then(formatData)
        await db.createTable('Precipitation')
        db.setData(data, 'Precipitation')
      }

      if (yearFrom === 1881 && yearTo === 2006) {
        const data = await db.getAllData('Precipitation')
          .then(mapData)
        postMessage(data)
      } else {
        const data = await db.getData(yearFrom, yearTo, 'Precipitation')
          .then(mapData)
        postMessage(data)
      }
      break
    }

    default: break
  }
}
