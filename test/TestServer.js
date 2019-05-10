const request = require('supertest');
const mocha = require('mocha')
const assert = require('chai').assert;
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../server.js');
const test = require('firebase-functions-test')({
    databaseURL: "https://bhredz.firebaseio.com",
    projectId: "bhredz",
    storageBucket: "bhredz.appspot.com"
}, '../bhredz-9315a3dadb11.json');


describe('Check Page Avaliablity', function () {
  it("404", function (done) {
    chai.request('http://localhost:8080')
      .get('/apple')
      .end(function(err, res) {
        expect('Content-Type', "text/html; charset=utf-8");
        expect(res).to.have.status(404);
        done()
      })
  });
  it("Homepage", function (done) {
    chai.request('http://localhost:8080')
      .get('/')
      .end(function(err, res) {
        expect('Content-Type', "text/html; charset=utf-8");
        expect(res).to.have.status(200);
        done()
        })
  });
  it("Login", function (done) {
    chai.request('http://localhost:8080')
      .get('/login')
      .end(function(err, res) {
        expect('Content-Type', "text/html; charset=utf-8");
        expect(res).to.have.status(200);
        done()
      })
  });
  it("Signup", function (done) {
    chai.request('http://localhost:8080')
      .get('/signup')
      .end(function(err, res) {
        expect('Content-Type', "text/html; charset=utf-8");
        expect(res).to.have.status(200);
        done()
      })
  });
  it("Products", function (done) {
    chai.request('http://localhost:8080')
      .get('/products')
      .end(function(err, res) {
        expect('Content-Type', "text/html; charset=utf-8");
        expect(res).to.have.status(200);
        done()
      })
  });
  it("Add", function (done) {
    chai.request('http://localhost:8080')
      .get('/add')
      .end(function(err, res) {
        expect('Content-Type', "text/html; charset=utf-8");
        expect(res).to.have.status(200);
        if (err) {
          done(err);
        } else {
          done()
        };
      });
  });
});

describe('Check if Firebase functions', function () {
  it('Log in', function (done) {
    chai.request('http://localhost:8080')
      .post('/actionlogin')
      .send({
        email: "test@mail.com",
        pass: "asdfgh"
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        assert.equal(message, "test@mail.com");
        done();
      });
  });
});
