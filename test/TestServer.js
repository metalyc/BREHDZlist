const request = require('supertest');
const assert = require('chai').assert;
const expect = require('chai').expect;
// const test = require('firebase-functions-test')({
//     databaseURL: "https://bhredz.firebaseio.com",
//     projectId: "bhredz",
//     storageBucket: "bhredz.appspot.com"
// }, '../bhredz-9315a3dadb11.json');


// Ignore mongo stuff
// const conn = require('../server_utils/mongo_util.js');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// const app = require('../server.js');

describe('GET /', function () {
    it("should return webpage with title of 'Welcome to the login page.' ", function (done) {
        chai.request('http://localhost:8080')
            .get('/')
            .end(function(err, res) {
                expect('Content-Type', "text/html; charset=utf-8");
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('GET /login', function () {
    it("should return the home page ", function (done) {
        chai.request('http://localhost:8080')
            .get('/login')
            .end(function(err, res) {
                expect('Content-Type', "text/html; charset=utf-8");
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('GET /apple', function () {
    it("Should not work, apple page does not exist ", function (done) {
        chai.request('http://localhost:8080')
            .get('/apple')
            .end(function(err, res) {
                expect('Content-Type', "text/html; charset=utf-8");
                expect(res).to.have.status(404);
                done()
            })
    });
});

describe('POST /firebase', function () {
    it('POST req for user submitted data', function () {
        chai.request('http://localhost:8080')
            .post('/firebase')
            .send({
                name: 'TV',
                price: 20,
                condition: 'OK',
                location: 'Vancouver'
            })
            .then(function(res) {
                expect(res).to.have.status(200);
            })
    })
});
