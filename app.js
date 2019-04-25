const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes');
const app = express()
const port = 9000

const httpServer = http.createServer(app);
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
httpServer.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
apiRoutes(app);

module.exports = app;
