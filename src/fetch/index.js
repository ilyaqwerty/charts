export function get (url, data, ...rest) {
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
