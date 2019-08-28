require('dotenv').config()
const Express = require('express')
const SlackBot = require('slackbots')
const bodyParser = require('body-parser')
const request = require('request')
const path = require('path')

// Creates Express app
const app = Express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Environment variables
const { SLACK_BOT_TOKEN: slackBotToken, SLACK_AUTH_TOKEN: slackToken, PORT } = process.env
const port = PORT || 3000

if (!slackBotToken || !slackToken) {
  console.error('missing environment variables SLACK_BOT_TOKEN and/or SLACK_AUTH_TOKEN')
  process.exit(1)
}

// Local Environment
app.use(Express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))

// Starts server
app.listen(port,() => {
  console.log(`Server started at localhost:${ port }`)
})

// Create a new bot
const bot = new SlackBot({
  token: slackBotToken,
  name: 'Tempo Alert'
})

const botParams = {
  icon_emoji: ':cat:'
}

// Build Environment
app.post('/', (req, res) => {
  bot.postMessageToUser(req.body.user_name, 'caraio!', botParams)
  .then((result) => {
    return res.json(result)
  })
  .catch(console.error)
})

// bot.on('start', function() {
//     // more information about additional params https://api.slack.com/methods/chat.postMessage
//     var params = {
//         icon_emoji: ':cat:'
//     }
    
//     // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
//     // bot.postMessageToChannel('random', 'Ja bateram o ponto hoje?', params)
    
//     // define existing username instead of 'user_name'
//     bot.postMessageToUser('bianca_kaiser', 'meow!', params) 
    
//     // If you add a 'slackbot' property, 
//     // you will post to another user's slackbot channel instead of a direct message
//     // bot.postMessageToUser('bianca_kaiser', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' })
// })
