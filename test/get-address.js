/* global describe, it, beforeEach */

// const expect = require('chai').expect
const request = require('supertest')
const expect = require('chai').expect

const app = require('./support/app')

describe('Add Address', ()=> {
  let req

  beforeEach(() => req = request(app.express).get('/addresses/123'))

  describe("when the address isn't found", () => {
    it('returns 404', (done) => req.expect(404, done))
  })

  describe('when the address is found', () => {
    beforeEach((done) => app.modelInstance('address', {address: '123', nonce: 456}).save(done))

    it('returns 200', (done) => req.expect(200, done))

    it('returns the address json', (done) => {
      req.expect((res) => {
        expect(res.body.address).to.equal('123')
      }).end(done)
    })
    it('does not return the nonce', (done) => {
      req.expect((res) => {
        expect(res.body.nonce).to.equal(undefined)
      }).end(done)
    })
  })
})
