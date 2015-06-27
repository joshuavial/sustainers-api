var app = require('./app')
var env = process.argv[2]

if (env == 'test') {
  app.set('port', process.env.PORT || 8800);
} else {
  app.set('port', process.env.PORT || 8000);
}
var server = app.listen(app.get('port'), function () {
  console.log(server.address().port)
})
