
const supertest = require('supertest')
const server = require('./server')

describe('server testeration', ()=>{
    it('can run the tests', ()=>{
        expect(true).toBeTruthy();
    })

    describe('GET /', ()=>{
        it('should return status code 200', ()=>{
            return supertest(server)
            .get('/')
           // .expect(200) //from supertest
            .then(response =>{
                //from jest
                expect(response.status).toBe(200)
            })
        })
        it('should return api up', ()=>{
            return supertest(server)
            .get('/')
            .then(res =>{
                expect(res.body).toEqual({api:"up and running"})
                expect(res.body.api).toBeDefined()
                expect(res.body.api).toBe('up and running')

            })

        })

    })
    describe('GET /api', ()=>{
        it('should return status code 200', ()=>{
            return supertest(server)
            .get('/api')
           // .expect(200) //from supertest
            .then(response =>{
                //from jest
                expect(response.status).toBe(200)
            })
        })
        it('should return api running please access specific endpoints', ()=>{
            return supertest(server)
            .get('/api')
            .then(res =>{
                expect(res.body).toEqual({api:'Api running, please access specific endpoints'})
                expect(res.body.api).toBeDefined()
                expect(res.body.api).toBe('Api running, please access specific endpoints')
        })
    })
})
})