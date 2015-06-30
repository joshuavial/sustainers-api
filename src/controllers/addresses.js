const AddressSchema = require('../schemas/address')
const Message = require('bitcore-message')

class AddressesController {
  constructor(app) {
    this.app = app
  }

  static registerHandlers(route, app) {
    let controller = new AddressesController(app)

    app.express.post(route, (req, res) => { controller.create(req, res) })
    app.express.get(`${route}/:account`, (req, res) => { controller.get(req, res) })

  }

  create(req, res) {
    let params = parseParams(req.body)
    if (!paramsValid(params)) { return(res.sendStatus(400)) }
    if (!signatureValid(params)) { return(res.sendStatus(401)) }
    
    checkForGreaterNonce(this.app.model('address'), params, (nonceInvalid) => {
      if(nonceInvalid) { return(res.sendStatus(401)) }
      this.app.modelInstance('address', params).save()
      res.sendStatus(200)
    })
  }

  get (req, res) {
    this.app.model('address').findOne({address: req.params.account}, (err, address) => {
      if (!address) {return res.sendStatus(404)}
      res.send({address: address.address})
    })
  }
}

function parseParams(body) {
  return({
    address: body.address,
    nonce: body.nonce,
    signature: body.signature
  })
}

function paramsValid(params) {
  return(params.address && params.nonce && params.signature)
}

function signatureValid(params) {
  return(Message(params.nonce.toString()).verify(params.address, params.signature))
}

function checkForGreaterNonce(Address, params, done) {
  Address.findOne({nonce: {$gte: params.nonce}}, (err, res) => {
    done(res != null)
  })
}

module.exports = AddressesController
