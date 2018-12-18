import jquery from 'jquery'

const removeSrc = /(src="[^"]+")|(src='[^']+')/gm

const getAbsoluteUrl = (href, url) =>
  href.indexOf('http') === 0
    ? href
    : `${url}${href[0] === '/' ? '' : '/'}${href}`

export const searchMp3 = url => {
  return new Promise((resolve, reject) => {
    const timeoutValue = 10000
    const proxyUrl = 'http://localhost:3000/'
    const timeout = setTimeout(() => {
      console.error(Error(`Timeout after ${timeoutValue}ms with ${url}`))
      resolve([])
    }, timeoutValue)
    fetch(proxyUrl + url, {
      method: 'GET'
    })
      .then(response => {
        if (response.status > 199 && response.status < 300) {
          response
            .text()
            .then(html => {
              clearTimeout(timeout)
              const htmlWithoutSrc = html.replace(removeSrc, '')
              const aElements = jquery(htmlWithoutSrc).find('a')
              const allMp3 = [
                ...aElements.map(id => ({
                  name: aElements[id].innerText,
                  url: getAbsoluteUrl(
                    aElements[id].href.split('http://localhost:8080/')[1],
                    url
                  )
                }))
              ].filter(elem => elem.url.split('.').pop() === 'mp3')
              resolve(allMp3)
            })
            .catch(error => {
              clearTimeout(timeout)
              console.error(error)
              resolve([])
            })
        } else {
          clearTimeout(timeout)
          console.error(
            Error(`Error Api response, status code: ${response.status}`)
          )
          resolve([])
        }
      })
      .catch(error => {
        clearTimeout(timeout)
        console.error(error)
        resolve([])
      })
  })
}
