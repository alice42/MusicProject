export const searchGoogle = query => {
  return new Promise((resolve, reject) => {
    const prefix = '?intitle:index.of? mp3 '
    const finalQuery = prefix + query
    const googleApiKey = 'AIzaSyAuVPkeRj2xMoxcoBlD7anwEEjDRtUWOmE'
    const cxKey = '005515934938340543241:5emp1pewlfm'
    const targetUrl = `https://www.googleapis.com/customsearch/v1?cx=${cxKey}&key=${googleApiKey}&q=${finalQuery}`

    fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        if (response.status > 199 && response.status < 300) {
          resolve(response.json())
        } else {
          reject(Error(`Error Api response, status code: ${response.status}`))
        }
      })
      .catch(error => reject(error))
  })
}

export default searchGoogle
