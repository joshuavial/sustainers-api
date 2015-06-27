const AddressSchema = require('../schemas/address')

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

    if (!params.address || !params.nonce || !params.signature) {
      res.sendStatus(400)
    } else {
      let address = this.app.modelInstance('address', params)
      address.save()
      res.sendStatus(200)
    }
  }
}

function parseParams(body) {
  return({
    address: body.address,
    nonce: body.nonce,
    signature: body.signature
  })
}

module.exports = AddressesController
