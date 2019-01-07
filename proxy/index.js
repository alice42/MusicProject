const express = require('express')
const request = require('request')
const app = express()
const port = 13371
const fs = require('fs')

app.use(function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Origin', 'http://localhost:13370')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
  next()
})

app.get('/*', (req, res) => {
  const url = req.originalUrl.substring(1)
  const cachePath = `./cache/${encodeURIComponent(url)}`

  if (fs.existsSync(cachePath)) {
    console.log(`cache found for ${url}`)
    res.send(fs.readFileSync(cachePath))
  } else {
    request(
      {
        url,
        followRedirect: true,
        followAllRedirects: true,
        maxRedirects: 10,
        removeRefererHeader: false
      },
      (error, response, body) => {
        if (error) {
          res.send(500, `ERROR while redirecting ${url}`, error)
        } else {
          res.send(body)
          // fs.writeFileSync(cachePath, body)
        }
      }
    )
  }
})

app.listen(port, () =>
  console.log(`Proxy is running at http://localhost:${port}/`)
)
