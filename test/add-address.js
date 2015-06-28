/* global describe, it, beforeEach */

const expect = require('chai').expect
const request = require('supertest')
const bitcore = require('bitcore')
const Message = require('bitcore-message')

const app = require('./support/app')

describe('Add Address', ()=> {
  let priv, nonce, signature, req

  beforeEach(() => {
    priv = new bitcore.PrivateKey()
    nonce = 1435404524
    signature = Message(nonce.toString()).sign(priv)
    req = request(app.express).post('/addresses')
  })

  it('saves an address to the database', (done) => {
    req.send({ address: priv.toAddress().toString(), nonce: nonce, signature: signature })
      .expect(200)
      .end((e, res) => {
        app.model('address').count({}, (e, count)=> {
          expect(count).to.equal(1)
          done()
        })
      })
  })

  it('returns 400 if params are invalid', (done) => {
    req.expect(400, done)
  })

  it('returns 401 if signature is invalid', (done) => {
    signature = Message('123').sign(priv)
    req.send({ address: priv.toAddress().toString(), nonce: nonce, signature: signature })
      .expect(401, done)
  })

  it('requires nonce to be one greater than previous')
})

