'use strict'

const path = require('path')
const express = require('express')
// default port where dev server listens for incoming traffic
const port = 8080
const app = express()

const staticPath = path.posix.join('/', 'dist')
app.use(staticPath, express.static('./dist'))

const uri = 'http://localhost:' + port

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')

const server = app.listen(port)

console.log('> Listening at ' + uri + '\n')

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
