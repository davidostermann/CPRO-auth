require('dotenv').config({ path: './test/.env.test' })
const request = require('supertest')
const app = require('../app')
const { adminToken, userToken, setupDB } = require('./config')

beforeAll(async () => {
  await setupDB()
})

describe('authorizations', () => {
  it('It responds 401', async () => {
    const response = await request(app).get('/users')
    expect(response.statusCode).toBe(401)
  })

  it('It responds 200', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `bearer ${adminToken}`)
    expect(response.statusCode).toBe(200)
  })
})

describe('/users', () => {
  it('It return 8 users', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `bearer ${adminToken}`)
    expect(response.body.length).toBe(8)
  })
})

describe('/users/:id', () => {
  it('It return first user', async () => {
    const response = await request(app)
      .get('/users/1')
      .set('Authorization', `bearer ${adminToken}`)
    expect(response.body).toEqual({
      email: 'do@do.do',
      firstname: 'David',
      id: 1,
      lastname: 'Ostermann',
      password: '$2a$05$I240oRkqHe1eiiuTDHP37.MzWTV4vef6Vb1RRXe9HszFbqVzXe9IW',
      role: 'admin'
    })
  })

  it('It update first user', async () => {
    const response = await request(app)
      .put('/users/1')
      .set('Authorization', `bearer ${adminToken}`)
      .send({ firstname: 'Davidoo', lastname: 'Ostermann' })
    expect(response.body).toHaveProperty('firstname', 'Davidoo')
  })
})

afterAll(async () => await require('../models/db').end())