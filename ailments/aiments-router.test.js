const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(() => {
    return db.migrate
      .rollback()
      .then(() => db.migrate.latest())
      .then(() => db.seed.run());
  });

 



test('get /api/ailments', async()=>{
    
    const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'testname', password: 'password'})
    const login = await request(server)
    .post('/api/auth/login')
    .send({username: 'testname', password: 'password'})
    const res = await request (server)
        .get('/api/ailments')
        .set('authorization', login.body.token)
        expect(res.status).toBe(200)
    
})

test('get /api/ailments/:id', async()=>{
    
    const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'testname', password: 'password'})
    const login = await request(server)
    .post('/api/auth/login')
    .send({username: 'testname', password: 'password'})
    const res = await request (server)
        .get('/api/ailments/2')
        .set('authorization', login.body.token)
        expect(res.status).toBe(200)
})


test('post /api/ailments/', async()=>{
    
    const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'testname', password: 'password'})
    const login = await request(server)
    .post('/api/auth/login')
    .send({username: 'testname', password: 'password'})
    const res = await request (server)
        .post('/api/ailments')
        .set('authorization', login.body.token)
        .send({ailment_name: 'testname', description: 'description', user_id: 2})
        expect(res.status).toBe(201)
})

test('put /api/ailments/:id', async()=>{
    const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'testname', password: 'password'})
    const login = await request(server)
    .post('/api/auth/login')
    .send({username: 'testname', password: 'password'})
    const res = await request (server)
        .put('/api/ailments/1')
        .set('authorization', login.body.token)
        .send({ailment_name: 'testname', description: 'descriptionChange', user_id: 2})
        expect(res.status).toBe(200)
})


test('delete /api/ailments/:id', async ()=>{
    const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'testname', password: 'password'})
    const login = await request(server)
    .post('/api/auth/login')
    .send({username: 'testname', password: 'password'})
    const post = await request (server)
        .post('/api/ailments')
        .set('authorization', login.body.token)
        .send({ailment_name: 'testname', description: 'description', user_id: 2})
        expect(post.status).toBe(201)
    const res = await request (server)
        .delete('/api/ailments/1')
        .set('authorization', login.body.token)
        
        expect(res.status).toBe(200)
})