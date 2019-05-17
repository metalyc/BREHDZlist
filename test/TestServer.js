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
const admin = require("firebase-admin")

describe('Check Page Avaliablity Tests', function () {
  it("404", function (done) {
    chai.request('http://localhost:8080')
      .get('/apple')
      .end(function(err, res) {
        expect('Content-Type', "text/html; charset=utf-8");
        expect(res).to.have.status(404);
        done()
      })
  });
  it("Failing Homepage", function (done) {
    chai.request('http://localhost:8080')
      .get('/')
      .end(function(err, res) {
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

describe('Firebase Authentication tests', function () {
  it('Sign up', function (done) {
    chai.request('http://localhost:8080')
      .post('/newUser')
      .send({
        email: "foo@bar.com",
        password1: "asdfgh",
        password2: "asdfgh"
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Log in (with created account)', function (done) {
    chai.request('http://localhost:8080')
      .post('/actionlogin')
      .send({
        email: "foo@bar.com",
        pass: "asdfgh"
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Log out', function (done) {
    chai.request('http://localhost:8080')
      .get('/logout')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  /*
  it('Delete created user (clean up)', function () {
    assert.strictEqual(app.deleteTest, true);
  });*/
});


/*
describe('Firebase Database Tests', function () {
  it('Add data to products', function (done) {
    chai.request('http://localhost:8080')
      .post('/firebase')
      .send({
        name: "test",
        price: "1",
        condition: "test",
        location: "test",
        phone: "555-555-5555",
        img: "test.png"
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
*/
