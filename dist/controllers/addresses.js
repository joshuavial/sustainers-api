'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AddressSchema = require('../schemas/address');
var Message = require('bitcore-message');

var AddressesController = (function () {
  function AddressesController(app) {
    _classCallCheck(this, AddressesController);

    this.app = app;
  }

  _createClass(AddressesController, [{
    key: 'create',
    value: function create(req, res) {
      var _this = this;

      var params = parseParams(req.body);
      if (!paramsValid(params)) {
        return res.sendStatus(400);
      }
      if (!signatureValid(params)) {
        return res.sendStatus(401);
      }

      checkForGreaterNonce(this.app.model('address'), params, function (nonceInvalid) {
        if (nonceInvalid) {
          return res.sendStatus(401);
        }
        _this.app.modelInstance('address', params).save();
        res.sendStatus(200);
      });
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

function paramsValid(params) {
  return params.address && params.nonce && params.signature;
}

function signatureValid(params) {
  return Message(params.nonce.toString()).verify(params.address, params.signature);
}

function checkForGreaterNonce(Address, params, done) {
  Address.findOne({ nonce: { $gte: params.nonce } }, function (err, res) {
    done(res != null);
  });
}

module.exports = AddressesController;
//# sourceMappingURL=../controllers/addresses.js.map