import jquery from 'jquery'

export const searchGoogle = query => {
  return new Promise((resolve, reject) => {
    const proxyUrl = 'http://localhost:3000/'
    const googleUrl = `https://www.google.fr/search?q=${escape(
      `intitle:"index of /" -inurl:"html|htm|php" mp3 ${query}`
    )}`
    console.log(proxyUrl + googleUrl)
    fetch(proxyUrl + googleUrl, {
      method: 'GET'
    })
      .then(response => {
        response
          .text()
          .then(html => {
            const aElements = jquery(html).find('#ires h3 a')
            const links = [
              ...aElements.map(id =>
                decodeURI(
                  aElements[id].href
                    .split('http://localhost:8080/')[1]
                    .split('&sa')[0]
                )
              )
            ]
              .filter(link => link.indexOf('url?q=') === 0)
              .map(link => link.split('url?q=')[1])
            resolve(links)
          })
          .catch(error => reject(error))
      })
      .catch(error => reject(error))
  })
}

export default searchGoogle
