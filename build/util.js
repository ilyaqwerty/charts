function formatData (data) {
  let year = '1881',
    month = '01'

  const mappedData = {
    '188101': []
  }

  data.forEach(value => {
    let [currentYear, currentMonth] = value.t.split('-')

    if (currentYear === year && currentMonth === month) {
      mappedData[currentYear + currentMonth].push(value.v)
    } else {
      const oldKey = `${year}${month}`
      mappedData[oldKey] = getAverage(mappedData[oldKey])

      const key = currentYear + currentMonth
      if (key in mappedData) {
        mappedData[key].push(value.v)
      } else {
        mappedData[key] = [value.v]
      }
      year = currentYear
      month = currentMonth
    }
  })
  mappedData['200612'] = getAverage(mappedData['200612'])
  return mappedData
}

function mapData (data, step = 12) {
  return data.reduce((acc, value, index) => {
    if (Array.isArray(value)) {
      console.log(index)
    }
    if (index < step) {
      acc.push([value])
      return acc
    } else {
      acc[index % step].push(value)
      return acc
    }
  }, [])
    .reduce((acc, value) => {
      acc.push(getAverage(value))
      return acc
    }, [])
}

function getAverage (data) {
  return round(data.reduce((acc, v) => acc + v, 0) / data.length)
}

function round (value) {
  return Math.round(value * 10) / 10
}