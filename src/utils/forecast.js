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
      const { temperatureHigh, temperatureLow } = response.body.daily.data[0]
      callback(undefined, "It is currently " + temperature + " degrees out. There is a " + precipProbability + "% chance of rain. The temperature will peak at " + temperatureHigh + " and fall to " + temperatureLow + ".")
    }
  })
}

module.exports = forecast
