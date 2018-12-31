import jquery from 'jquery'

const srcAttr = /(src="[^"]+")|(src='[^']+')/gm

const getAbsoluteUrl = (href, url) => {
  const regex = /(\/[^]{10,})(?=.*\1)/
  const absoluteUrl =
    href.indexOf('http') === 0
      ? href
      : `${url}${href[0] === '/' ? '' : '/'}${href}`
  return absoluteUrl.replace(regex, '')
}

export const searchMp3 = url => {
  return new Promise((resolve, reject) => {
    const timeoutValue = 10000
    const proxyUrl = 'http://localhost:13371/'
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
              const htmlWithoutSrc = html.replace(srcAttr, '')
              const aElements = jquery(htmlWithoutSrc).find('a')
              const allMp3 = [...aElements]
                .filter(elem => elem.href.split('.').pop() === 'mp3')
                .map(elem => ({
                  name: elem.innerText,
                  url: getAbsoluteUrl(
                    elem.href.split('http://localhost:13370/')[1],
                    decodeURIComponent(url)
                  )
                }))
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
