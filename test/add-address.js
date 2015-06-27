/* global describe, it */

const app = require('./support/app')
const request = require('supertest')

describe('Add Addres', ()=> {
  it('saves an address to the database', (done) => {
    done()
  })

  it('returns 400 if params are invalid', (done) => {
    request(app.express)
      .post('/addresses')
      .expect(400, done)
  })

  it('does nothing if signature is invalid')

  it('requires nonce to be one greater than previous')
})
