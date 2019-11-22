const express = require('express')

const app = express()

app.get('', (req, res) => {
  res.send('Hello Express!')
})

app.get('/help', (req, res) => {
  res.send('I need somebody...')
})

app.get('/about', (req, res) => {
  res.send('Round about now')
})

app.get('/weather', (req, res) => {
  res.send('Baby it\'s cold outside')
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
