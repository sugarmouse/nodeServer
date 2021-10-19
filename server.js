const http = require('http')
const fs = require('fs')
const url = require('url')



http.createServer((req, res) => {
  let myURL = url.parse(req.url, true)
  switch (myURL.pathname) {
    case '/getWeather':
      if (myURL.query.city === 'beijing') {
        res.end(JSON.stringify({ city: 'beijing', weather: 'sunny' }))
      } else {
        res.end(JSON.stringify({ city: myURL.query.city, weather: 'unkown' }))
      }
      break
    default:
      try {
        let pathname = myURL.pathname === '/' ? 'index.html' : myURL.pathname
        res.end(fs.readFileSync(__dirname + pathname))
      } catch (e) {
        res.setHeader('Content-type', 'text/html')
        res.writeHead('404', 'Not Found')
        res.end('<h1>404 Not Found~</h1>')
      }
  }
}).listen(5000)