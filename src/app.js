const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup location of static directory to serve
app.use(express.static(publicDirectoryPath))

// Routes of the pages being served
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Wise Chimp.'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Round about now',
    name: 'Wise Chimp.'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Pleeese!',
    message: 'I need somebody',
    name: 'Wise Chimp.'
  })
})

// Using the return pattern rather than else
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You need to provide an address.'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404error', {
    title: '404 error',
    errorMessage: 'Help article not found',
    name: 'Wise Chimp.'
  })
})

app.get('*', (req, res) => {
  res.render('404error', {
    title: '404 error',
    errorMessage: 'This isn\'t the page you\'re looking for, and those droids over to your left are definitely not the droids you\'re looking for either',
    name: 'Wise Chimp.'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port + '.')
})
