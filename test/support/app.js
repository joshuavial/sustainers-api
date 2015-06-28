const App = require('../../src/app')
const mongoose = require('mongoose')

let connection = mongoose.createConnection('mongodb://localhost/sustainers-api-test')
let app = new App(connection)
module.exports = app

afterEach((done) => {
  connection.db.dropDatabase(done)
})
