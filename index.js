var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('done')
})

app.post('/message', (req, res) => {
    console.log(req.body)
    res.send('OK')
})

app.listen(process.env.PORT || 3000, (err) => {
    if(err) return console.log('Error: ', err)
    console.log('Server is running on port 3000.')
})