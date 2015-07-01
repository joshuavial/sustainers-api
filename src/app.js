const express = require('express')
const AddressController = require('./controllers/addresses')
const bodyParser = require('body-parser')

class App {
  constructor (connection) {
    this.connection = connection
  }

  startExpress () {
    console.log('starting')
    this.express = express()
    this.express.use(bodyParser.json())
    AddressController.registerHandlers('/addresses', this)
  }

  model (name) {
    let schema = require(`./schemas/${name}`)
    return this.connection.model(name, schema)
  }

  modelInstance (name, params) {
    let Class = this.model(name)
    return new Class(params)
  }
}

module.exports = App
