process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server/routes/routes');
const conn = require ('../../../server/baseData/index');

describe('POST /usuario', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done)=>{
        conn.close()
            .then(()=> done())
            .catch((err) => done(err));
    });

    it('OK, creando un nuevo usuario',(done) => {
        request(app).post('/usuario')
            .set({'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbCI6IkFETUlOX1JPTCIsImVzdGFkbyI6dHJ1ZSwiX2lkIjoiNWVmZGU3MDNjODBkZGU4OTFiNzc0YmYwIiwibm9tYnJlIjoiZmVkZSBBZ3Vlcm8iLCJlbWFpbCI6ImNlbGVzdGVAZ21haWwuY29tIiwiX192IjowfSwiaWF0IjoxNTk0Njk2MDcxLCJleHAiOjE1OTQ2OTk2NzF9.IEf3C9Nat9w7_UB7bk-XKqX8GSqS8FdMXhoEPUra8qY'})
            .send({
                nombre:"federico",
                email:"f.aguero123456@gmail.com",
                password:"Lanegrita",
                rol:"ADMIN_ROL"
            })
            .then((res) => { 
                const body = res.body;
                expect(body).to.contain.property('ok');
                expect(body).to.contain.property('usuario');
                done();
            })
            .catch((err) => done(err))
    })
})