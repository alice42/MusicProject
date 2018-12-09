import { parse } from 'himalaya'

const searchElement = (elements, store) => {
  elements.forEach(element => {
    if (
      element.tagName === 'a' &&
      element.attributes.find(attribute => attribute.key === 'href')
    ) {
      store.push(element)
    }
    if (element.children && element.children.length) {
      searchElement(element.children, store)
    }
  })
}

const getHrefAttributes = (attributes, url) => {
  const href = attributes.find(attribute => attribute.key === 'href')
  const value =
    href.value.indexOf('http') === 0
      ? href.value
      : href.value[0] === '/'
      ? `${url}${href.value}`
      : `${url}/${href.value}`
  return value
}

const retriveAudio = (json, url) => {
  const elements = []
  searchElement(json, elements)
  //slice 100 firsts because its a MVP
  const debug = elements.slice(0, 99)
  const elementsFormated = debug.map(element => ({
    name: element.children[0] && element.children[0].content,
    url: getHrefAttributes(element.attributes, url),
    artist: '',
    cover: '',
    lrc: '',
    theme: ''
  }))
  const mp3s = elementsFormated.filter(element => {
    return element.url.split('.').pop() === 'mp3'
  })
  return mp3s
}

export const searchMp3 = url => {
  return new Promise((resolve, reject) => {
    const timeoutValue = 10000
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const timeout = setTimeout(() => {
      console.error(Error(`Timeout after ${timeoutValue}ms with ${url}`))
      resolve([])
    }, timeoutValue)
    fetch(proxyUrl + url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        if (response.status > 199 && response.status < 300) {
          response
            .text()
            .then(html => {
              const json = parse(html)
              const allMp3 = retriveAudio(json, url)
              clearTimeout(timeout)
              resolve(allMp3)
            })
            .catch(error => {
              clearTimeout(timeout)
              reject(error)
            })
        } else {
          clearTimeout(timeout)
          reject(Error(`Error Api response, status code: ${response.status}`))
        }
      })
      .catch(error => {
        clearTimeout(timeout)
        reject(error)
      })
  })
}
