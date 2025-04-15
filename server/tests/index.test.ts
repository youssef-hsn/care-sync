import request from 'supertest'
import {app} from '../app'

describe('GET /api/status', () => {
  it('should respond with 200 to make sure API is up', async () => {
    const response = await request(app).get('/api/status')
    expect(response.status).toBe(200)
    expect(response.text).toMatch(/up/i)
  })
})