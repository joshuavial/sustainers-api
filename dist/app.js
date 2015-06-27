'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var express = require('express');
var AddressController = require('./controllers/addresses');

var App = function App(connection) {
  _classCallCheck(this, App);

  this.connection = connection;
  this.express = express();
  AddressController.registerHandlers('/addresses', this);
};

module.exports = App;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AddressSchema = require('../schemas/address');

var AddressesController = (function () {
  function AddressesController(app) {
    _classCallCheck(this, AddressesController);

    this.Address = app.connection.model('Address', AddressSchema);
  }

  _createClass(AddressesController, null, [{
    key: 'registerHandlers',
    value: function registerHandlers(route, app) {
      var controller = new AddressesController(app);

      app.express.post(route, function (req, res) {
        res.sendStatus(400);
      });
    }
  }]);

  return AddressesController;
})();

module.exports = AddressesController;
'use strict';

var Schema = require('mongoose').Schema;
module.exports = new Schema({
  address: String,
  lastNonce: Number
});
//# sourceMappingURL=app.js.map