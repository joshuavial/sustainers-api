/* global describe, it */
let app = require('../src/app')
const request = require('supertest')

describe('server', () =>
  it('says hello', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Hello', done)
  })
)
