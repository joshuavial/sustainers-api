'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var express = require('express');
var AddressController = require('./controllers/addresses');
var bodyParser = require('body-parser');

var App = (function () {
  function App(connection) {
    _classCallCheck(this, App);

    this.connection = connection;
    this.express = express();
    this.express.use(bodyParser.json());
    AddressController.registerHandlers('/addresses', this);
  }

  _createClass(App, [{
    key: 'model',
    value: function model(name) {
      var schema = require('./schemas/' + name);
      return this.connection.model(name, schema);
    }
  }, {
    key: 'modelInstance',
    value: function modelInstance(name, params) {
      var Class = this.model(name);
      return new Class(params);
    }
  }]);

  return App;
})();

module.exports = App;
//# sourceMappingURL=app.js.map