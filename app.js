
const express = require('express')
const apiRoutes = require('./api-routes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/v1', apiRoutes)
app.use(express.static('public'))
app.use('/api/todos', require('./api-routes') )

const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))