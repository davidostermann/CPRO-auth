require('dotenv').config({ path: './test/.env.test' })
const request = require('supertest')
const app = require('../app')
const { setupDB } = require('./config')

beforeAll(async () => {
  await setupDB()
})

describe('authorizations', () => {
  it('It responds 200', async () => {
    const response = await request(app)
    .post('/auth/login')
    .send({ email: 'do@do.do', password: 'bacon' })
    expect(response.statusCode).toBe(200)
  })
})

afterAll(async () => await require('../models/db').end())