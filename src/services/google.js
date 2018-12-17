const urlParams = params =>
  `&${Object.keys(params)
    .map(id => `${id}=${params[id]}`)
    .join('&')}`

export const searchGoogle = (query, googleApiKey) => {
  return new Promise((resolve, reject) => {
    const cseUrl = 'https://www.googleapis.com/customsearch/v1'
    const cseParams = {
      key: googleApiKey,
      cx: '004222041682951594786:xllttvwe7r8',
      q: escape(`intitle:"index of /" -inurl:"html|htm|php" mp3 ${query}`)
    }
    const cseUrlWithParams = `${cseUrl}?${urlParams(cseParams)}`
    console.log('gs', `https://www.google.fr/search?q=${cseParams.q}`)
    console.log('gapi', cseUrlWithParams)
    fetch(cseUrlWithParams, {
      method: 'GET'
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
