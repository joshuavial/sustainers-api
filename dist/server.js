var App = require('./app')
var mongoose = require('mongoose')

var connection = mongoose.createConnection('mongodb://localhost/sustainers-api-dev')
var app = new App(connection)

var server = app.express.listen(3000, function () {
  console.log(server.address().port)
})
