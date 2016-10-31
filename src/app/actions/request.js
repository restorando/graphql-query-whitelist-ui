export default (url, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const jsonResponse = await response.json()
      response.ok ? resolve(jsonResponse) : reject(jsonResponse)
    } catch (e) {
      reject(e)
    }
  })
