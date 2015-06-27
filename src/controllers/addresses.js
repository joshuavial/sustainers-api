const AddressSchema = require('../schemas/address')

class AddressesController {
  constructor(app) {
    this.Address = app.connection.model('Address', AddressSchema)
  }

  static registerHandlers(route, app) {
    let controller = new AddressesController(app)

    app.express.post(route, (req, res) => {
      res.sendStatus(400)
    })
  }
}

module.exports = AddressesController
