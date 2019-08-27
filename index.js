require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const request = require("request")
const path = require('path')
// The port used for Express server
const PORT = process.env.PORT || 3000

// Creates express app
const app = express()
// Starts server
app.listen(PORT, function() {
  console.log(`Listening on ${ PORT }`)
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.post('/', (req, res) => {
  var data = {form: {
    token: process.env.SLACK_AUTH_TOKEN,
    channel: "#general",
    text: "Hi! :wave: \n I'm your new bot."
  }}
  request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
    // Sends welcome message
    res.json()
  })
})