export const searchGoogle = (query, googleApiKey) => {
  return new Promise((resolve, reject) => {
    const prefix = '?intitle:index.of? mp3 '
    const finalQuery = prefix + query
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
        response
          .json()
          .then(jsonResponse => {
            if (response.status > 199 && response.status < 300) {
              resolve(jsonResponse)
            } else {
              console.log(jsonResponse)
              if (jsonResponse.error) {
                reject(
                  Error(
                    `${jsonResponse.error.message}: ${
                      jsonResponse.error.errors[0].reason
                    }`
                  )
                )
              } else {
                reject(
                  Error(`Error Api response, status code: ${response.status}`)
                )
              }
            }
          })
          .catch(error => reject(error))
      })
      .catch(error => reject(error))
  })
}

export default searchGoogle
