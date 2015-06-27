const express = require('express')
const AddressController = require('./controllers/addresses')

class App {
  constructor (connection) {
    this.connection = connection
    this.express = express()
    AddressController.registerHandlers('/addresses', this)
  }
}

module.exports = App
