'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AddressSchema = require('../schemas/address');

var AddressesController = (function () {
  function AddressesController(app) {
    _classCallCheck(this, AddressesController);

    this.app = app;
  }

  _createClass(AddressesController, [{
    key: 'create',
    value: function create(req, res) {
      var params = parseParams(req.body);

      if (!params.address || !params.nonce || !params.signature) {
        res.sendStatus(400);
      } else {
        var address = this.app.modelInstance('address', params);
        address.save();
        res.sendStatus(200);
      }
    }
  }], [{
    key: 'registerHandlers',
    value: function registerHandlers(route, app) {
      var controller = new AddressesController(app);

      app.express.post(route, function (req, res) {
        controller.create(req, res);
      });
    }
  }]);

  return AddressesController;
})();

function parseParams(body) {
  return {
    address: body.address,
    nonce: body.nonce,
    signature: body.signature
  };
}

module.exports = AddressesController;
//# sourceMappingURL=../controllers/addresses.js.map