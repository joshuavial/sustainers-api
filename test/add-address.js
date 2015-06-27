/* global describe, it */

const app = require('./support/app')
const expect = require('chai').expect
const request = require('supertest')

describe('Add Address', ()=> {
  it('saves an address to the database', (done) => {
    request(app.express)
      .post('/addresses')
      .send({ address: '123', nonce: '1435404524', signature: 'abc' })
      .end((e, res) => {
        app.model('address').count({}, (e, count)=> {
          expect(count).to.equal(1)
          done()
        })
      })
  })

  it('returns 400 if params are invalid', (done) => {
    request(app.express)
      .post('/addresses')
      .expect(400, done)
  })

  it('does nothing if signature is invalid')

  it('requires nonce to be one greater than previous')
})
