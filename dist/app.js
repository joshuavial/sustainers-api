'use strict';

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  return res.send('Hello');
});

module.exports = app;
//# sourceMappingURL=app.js.map