const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(() => {
    return db.migrate
      .rollback()
      .then(() => db.migrate.latest())
      .then(() => db.seed.run());
  });

test('post /api/auth/register', async ()=>{
    const res = await request(server)
        .post('/api/auth/register')
        .send({username: 'testname', password: 'password'})
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            message: 'register successful',
            username: 'testname'
        })
})

test('post /api/auth/login', async()=>{
    
    const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'testname', password: 'password'})
    const res = await request(server)
    .post('/api/auth/login')
    .send({username: 'testname', password: 'password'})
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('token')
})