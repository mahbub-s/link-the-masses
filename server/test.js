var chai = require('chai');
var expect = chai.expect;

var chaiHttp = require('chai-http');
var server = require('./server');

chai.use(chaiHttp);

var idStorage;

// testing cheese dataset from database
describe('Questionnaire Data', () => {
    // test POST route
    describe('POST /', () => {
        it('should create new entry with title Test999', (done) => {
            // create a object for database
            var questionnaire = {
                title: 'Test999',
                type: 0
            }
            // testing the response gotten back from database
            chai.request(server)
                .post('/api/questionnaires')
                .send(questionnaire)
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    done();
                });
        });
    });
    // test GET route
    describe('GET /', () => {
        it('should get the last entry in questionnaire collection', (done) => {
            // testing the response gotten back from database
            chai.request(server)
                .get('/api/questionnaires')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body[res.body.length-1].type).to.equal(0);
                    expect(res.body[res.body.length-1].title).to.equal('Test999');
                    idStorage = res.body[res.body.length-1]._id;
                    done();
                });
        });
    });
    // test PUT route
    describe('PUT /', () => {
        it('should update entry with title Test999', (done) => {
            var questionnaire = {
                title: 'Test000',
                type: 0
            }
            // testing the response gotten back from database
            chai.request(server)
                .put('/api/questionnaires/' + idStorage)
                .send(questionnaire)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
    // test DELETE route
    describe('DELETE /', () => {
        it('should delete entry with Title 000', (done) => {
            // testing the response gotten back from database
            chai.request(server)
                .delete('/api/questionnaires/' + idStorage)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
});