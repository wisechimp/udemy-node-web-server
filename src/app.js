const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Bender Rodriguez'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Round about now',
    name: 'The funk soul brother.'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Pleeese!',
    message: 'I need somebody'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    location: 'Staffanstorp',
    forecast: 'Spreading gloom throughout the afternoon!'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
