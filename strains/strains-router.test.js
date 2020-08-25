const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(() => {
    return db.migrate
      .rollback()
      .then(() => db.migrate.latest())
      .then(() => db.seed.run());
  });

 



test('get /api/strains', async()=>{
    
    const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'testname', password: 'password'})
    const login = await request(server)
    .post('/api/auth/login')
    .send({username: 'testname', password: 'password'})
    const res = await request (server)
        .get('/api/strains')
        .set('authorization', login.body.token)
        expect(res.status).toBe(200)
    
})

test('get /api/strains/:id', async()=>{
    
    const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'testname', password: 'password'})
    const login = await request(server)
    .post('/api/auth/login')
    .send({username: 'testname', password: 'password'})
    const res = await request (server)
        .get('/api/strains/1')
        .set('authorization', login.body.token)
        expect(res.status).toBe(200)
    
})

test('post /api/strains/', async()=>{
    
    const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'testname', password: 'password'})
    const login = await request(server)
    .post('/api/auth/login')
    .send({username: 'testname', password: 'password'})
    const res = await request (server)
        .post('/api/strains')
        .set('authorization', login.body.token)
        .send({strain: 'testname', description: 'description', type: 'indica'})
        expect(res.status).toBe(201)
})

test('delete /api/strains/:id', async ()=>{
    const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'testname', password: 'password'})
    const login = await request(server)
    .post('/api/auth/login')
    .send({username: 'testname', password: 'password'})
    const post = await request (server)
        .post('/api/strains')
        .set('authorization', login.body.token)
        .send({strain: 'testname', description: 'description', type: 'indica'})
        expect(post.status).toBe(201)
    const res = await request (server)
        .delete('/api/strains/1')
        .set('authorization', login.body.token)
        
        expect(res.status).toBe(200)
})