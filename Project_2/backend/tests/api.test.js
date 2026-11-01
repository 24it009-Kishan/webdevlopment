// backend/tests/api.test.js
const request = require('supertest');
const app = require('../server');

describe('Task Management API', () => {
  test('GET / returns 200 and status Running', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Running');
  });

  // second test (post-lab assignment): protected route rejects requests without a token
  test('GET /api/tasks without token returns 401', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(401);
  });
});

