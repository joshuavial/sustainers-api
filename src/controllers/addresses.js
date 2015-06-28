const AddressSchema = require('../schemas/address')
const Message = require('bitcore-message')

class AddressesController {
  constructor(app) {
    this.app = app
  }

  static registerHandlers(route, app) {
    let controller = new AddressesController(app)

    app.express.post(route, (req, res) => {
      controller.create(req, res)
    })
  }

  create(req, res) {
    let params = parseParams(req.body)
    if (!paramsValid(params)) { return(res.sendStatus(400)) }
    if (!signatureValid(params)) { return(res.sendStatus(401)) }

    this.app.modelInstance('address', params).save()
    res.sendStatus(200)
  }
}

function signatureValid(params) {
  return(Message(params.nonce.toString()).verify(params.address, params.signature))
}

function paramsValid(params) {
  return(params.address && params.nonce && params.signature)
}

function parseParams(body) {
  return({
    address: body.address,
    nonce: body.nonce,
    signature: body.signature
  })
}

module.exports = AddressesController
