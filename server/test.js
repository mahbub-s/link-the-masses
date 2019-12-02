var chai = require('chai');
var expect = chai.expect;

var chaiHttp = require('chai-http');
var server = require('./server');

chai.use(chaiHttp);

var idStorage;

// testing questionnaire dataset from database
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
        it('should get the last entry in questionnaire collection with title Test999', (done) => {
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
        it('should update entry with title Test999 with title Test000', (done) => {
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
        it('should delete entry with title Test000', (done) => {
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

// testing diary dataset from database
describe('Diary Data', () => {
    // test POST route
    describe('POST /', () => {
        it('should create new entry with title Test999', (done) => {
            // create a object for database
            var diary = {
                title: 'Test999',
                type: 1
            }
            // testing the response gotten back from database
            chai.request(server)
                .post('/api/diary')
                .send(diary)
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    done();
                });
        });
    });
    // test GET route
    describe('GET /', () => {
        it('should get the last entry in diary collection with title Test999', (done) => {
            // testing the response gotten back from database
            chai.request(server)
                .get('/api/diary')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body[res.body.length-1].type).to.equal(1);
                    expect(res.body[res.body.length-1].title).to.equal('Test999');
                    idStorage = res.body[res.body.length-1]._id;
                    done();
                });
        });
    });
    // test PUT route
    describe('PUT /', () => {
        it('should update entry with title Test999 with title Test000', (done) => {
            var diary = {
                title: 'Test000',
                type: 1
            }
            // testing the response gotten back from database
            chai.request(server)
                .put('/api/diary/' + idStorage)
                .send(diary)
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
                .delete('/api/diary/' + idStorage)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
});

// testing chat log dataset from database
describe('Chat Log Data', () => {
    // test POST route
    describe('POST /', () => {
        it('should create new entry with title Test999', (done) => {
            // create a object for database
            var chat = {
                title: 'Test999',
                type: 2
            }
            // testing the response gotten back from database
            chai.request(server)
                .post('/api/chat')
                .send(chat)
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    done();
                });
        });
    });
    // test GET route
    describe('GET /', () => {
        it('should get the last entry in chat collection with title Test999', (done) => {
            // testing the response gotten back from database
            chai.request(server)
                .get('/api/chat')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body[res.body.length-1].type).to.equal(2);
                    expect(res.body[res.body.length-1].title).to.equal('Test999');
                    idStorage = res.body[res.body.length-1]._id;
                    done();
                });
        });
    });
    // test PUT route
    describe('PUT /', () => {
        it('should update entry with title Test999 with title Test000', (done) => {
            var chat = {
                title: 'Test000',
                type: 2
            }
            // testing the response gotten back from database
            chai.request(server)
                .put('/api/chat/' + idStorage)
                .send(chat)
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
                .delete('/api/chat/' + idStorage)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
});

// testing user dataset from database
describe('User Data', () => {
    // test POST route
    describe('POST /', () => {
        it('should create new entry with username test-user', (done) => {
            // create a object for database
            var user = {
                username: 'test-user',
                password: 'test',
                role: 0
            }
            // testing the response gotten back from database
            chai.request(server)
                .post('/api/users')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    done();
                });
        });
    });
    // test GET route
    describe('GET /', () => {
        it('should get the last entry in user collection with username test-user', (done) => {
            // testing the response gotten back from database
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body[res.body.length-1].role).to.equal(0);
                    expect(res.body[res.body.length-1].username).to.equal('test-user');
                    idStorage = res.body[res.body.length-1]._id;
                    done();
                });
        });
    });
    // test PUT route
    describe('PUT /', () => {
        it('should update entry with username test-user with username updated-user', (done) => {
            var user = {
                username: 'updated-user',
                role: 0
            }
            // testing the response gotten back from database
            chai.request(server)
                .put('/api/users/' + idStorage)
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
    // test DELETE route
    describe('DELETE /', () => {
        it('should delete entry with username updated-user', (done) => {
            // testing the response gotten back from database
            chai.request(server)
                .delete('/api/users/' + idStorage)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
});