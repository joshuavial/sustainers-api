const App = require('../../src/app')
const mongoose = require('mongoose')

let connection = mongoose.createConnection('mongodb://localhost/sustainers-api-test')

module.exports = new App(connection)
