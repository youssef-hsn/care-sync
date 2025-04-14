import request from 'supertest'
import {app, server} from '../app'

describe('GET /status', () => {
  it('should respond with 200 to make sure API is up', async () => {
    const response = await request(app).get('/status')
    expect(response.status).toBe(200)
    expect(response.text).toMatch(/up/i)
  })
})

afterAll((done) => {
  // Close the server after all tests
  server.close(() => {
    done()
  })
})