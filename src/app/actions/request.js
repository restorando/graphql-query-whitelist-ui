export default async (url, options = {}) => {
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
    if (response.ok) {
      return jsonResponse
    } else {
      throw new Error(jsonResponse)
    }
  } catch (e) {
    throw e
  }
}
