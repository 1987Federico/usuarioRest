process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server/routes/routes');
const conn = require ('../../../server/baseData/index');


describe('POST /login', () => {
    
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });
    
    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
        })

    it('OK, logueando un usuario',(done) => {
        request(app).post('/login')
            .send({
                email:"celeste@gmail.com",
                password:"Lanegrita"
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('ok');
                expect(body).to.contain.property('token');
                expect(body).to.contain.property('usuario');
                done();
            })
            .catch((err) => done(err));
    })
});