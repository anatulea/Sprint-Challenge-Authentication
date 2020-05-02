/* eslint-disable no-undef */
const request = require('supertest');
const server = require('../api/server');

test('returns true', () => {
  expect(true).toBe(true);
});

describe('get jokes', () => {
  it('should return status 401 if not authorized', async () => {
    const res = await request(server)
      .get('/api/jokes');
    expect(res.status).toBe(401);
  });
  it('should return the type of response to be JSON', async () => {
    const res = await request(server)
      .get('/api/jokes');
    expect(res.type).toBe('application/json');
  });
  it.todo('should return status 200 if authorized');
  // , async () => {
  //     await request(server)
  //     .post('/api/auth/register')
  //     .send({username:'name', password:'password'})

  //     await request(server)
  //     .post('/api/auth/login')
  //     .send({username:'name', password:'password'})

  //     const response = await request(server)
  //         .get('/api/jokes')
  //     expect(response.status).toBe(200);
  // });
});
