const express = require('express')
const next = require('next')
var config = require("./auto-deploy.config.json");

const port = parseInt(config.port, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.post('/api/*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`Ready on http://localhost:${port}`)
        })
    })
