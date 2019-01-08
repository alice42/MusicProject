import jquery from 'jquery'
import { uniqWith, orderBy } from 'lodash'

const srcAttrRegex = /(src="[^"]+")|(src='[^']+')/gm
const duplicateRegex = /(\/[^]{10,})(?=.*\1)/

const createUrl = (href, url) => {
  const hrefClean = href[0] === '/' ? href.substring(1) : href
  const urlClean =
    url[url.length - 1] === '/' ? url.substring(0, url.length - 1) : url
  return `${urlClean}${'/'}${hrefClean}`
}

const getAbsoluteUrl = (hrefRaw, urlRaw) => {
  const href =
    hrefRaw.indexOf('http://localhost:13370/') === 0
      ? hrefRaw.split('http://localhost:13370/')[1]
      : hrefRaw
  const url = decodeURIComponent(unescape(urlRaw))
  const absoluteUrl = href.indexOf('http') === 0 ? href : createUrl(href, url)
  return absoluteUrl.replace(duplicateRegex, '')
}

const getName = (innerText, href) => {
  const fileName = decodeURIComponent(unescape(href))
    .trim()
    .split('/')
    .pop()
    .split('.mp3')[0]
  return fileName
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
              const htmlWithoutSrc = html.replace(srcAttrRegex, '')
              const aElements = jquery(htmlWithoutSrc).find('a')
              const allMp3 = [...aElements]
                .filter(elem => elem.href.split('.').pop() === 'mp3')
                .map(elem => ({
                  name: getName(elem.innerText, elem.href),
                  url: getAbsoluteUrl(elem.href, url)
                }))
              const uniqResults = uniqWith(
                orderBy(allMp3, ['name'], ['desc']),
                (a, b) => a.url === b.url && a.name === ''
              )
              resolve(uniqResults)
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
