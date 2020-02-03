const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json()) // To parse incoming data from Vue
app.use(bodyParser.urlencoded({ extended: true }))

// require('./startup/db')() Uncomment after we have the MongoDB SRV
require('./startup/routes')(app)

// Initial Test if localhost:3000 is properly serve
app.get('/', function (req, res) {
  res.send('Hello World!')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
