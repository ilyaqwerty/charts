function formatData (data) {
  let year = 1881
  let month = 1
  const mappedData = {
    '188101': []
  }
  data.forEach(value => {
    let [currentYear, currentMonth] = value.t.split('-')
    if (currentYear == year && currentMonth == month) {
      mappedData[currentYear + currentMonth].push(value.v)
    } else {
      const key = currentYear + currentMonth
      if (key in mappedData){
        mappedData[key].push(value.v)
      } else {
        mappedData[key] = [value.v]
      }
    }
  })
  return mappedData
}