require('dotenv').config()
const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/' + process.env.DARKSKY + '/' + latitude + ',' + longitude + '?units=si'

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to the weather service.')
    } else if (response.body.error) {
      callback(response.body.error)
    } else {
      const { temperature, precipProbability } = response.body.currently
      callback(undefined, "It is currently " + temperature + " degrees out. There is a " + precipProbability + "% chance of rain.")
    }
  })
}

module.exports = forecast
