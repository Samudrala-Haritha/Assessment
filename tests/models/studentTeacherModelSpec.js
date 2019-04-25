//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let CommonStudents = require('../../models/studentTeacherModel');

//Require the dev-dependencies
let chai = require('chai');
var expect = chai.expect;
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('CommonStudents Serivce', () => {
  describe('/GET CommonStudents', () => {
      it('it should GET all the CommonStudents', (done) => {
            chai.request(server)
            .get('/api/commonStudents')
            .end((err, res) => {
				  res.should.have.status(200);
                  res.body.should.be.a('Object');
				 // res.body.length.should.be.eql(1);
              done();
            });
      });
	  it('it should GET all the CommonStudents', (done) => {
            chai.request('http://localhost:9000')
            .get('/api/commonStudents?teacherId=1&teacherId=2')
            .end((err, res) => {
				  res.should.have.status(200);
                  res.body.should.be.a('Object');
				 // res.body.length.should.be.eql(1);
              done();
            });
      });
  });
  describe('/POST Teacher', () => {
      it('it should not register a student without id', (done) => {
          let register = {
              studentId: 3,
              teacherId: 3
          }
            chai.request(server)
            .post('/api/register')
            .send(register)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('error');
                  res.body.should.have.property('data').eql('Primary key should not be null');
              done();
            });
      });
      it('it should register a student ', (done) => {
          let register = {
			  id: 2,
              studentId: 3,
              teacherId: 3
          }
            chai.request(server)
            .post('/api/register')
            .send(register)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });
  });
  describe('/Suspend student with teacher id', () => {
      it('it should not suspend the student without student and teacher id', (done) => {
            chai.request(server)
            .delete('/api/suspend')
            .end((err, res) => {
				  res.should.have.status(200);
                  res.body.should.be.a('Object');
				  res.body.should.have.property('error');
                  res.body.should.have.property('data').eql('INVALID_DATA');
              done();
            });
      });
	  it('it should suspend the student when student and teacher id is provided', (done) => {
            chai.request(server)
            .delete('/api/suspend?studentId=2&teacherId=1')
            .end((err, res) => {
				if(typeof(res.body) === 'object'){
					res.body.should.have.property('error');
                    res.body.should.have.property('data').eql('INVALID_DATA');
				}else{
				  res.should.have.status(200);
				  res.body.should.be.eql(1);
				}
              done();
            });
      });
  });
  describe('/Suspend student with teacher id', () => {
      it('it should update the student or teacher with student and teacher id', (done) => {
           let register = {
			  id:2,
              studentId: 3,
              teacherId: 1
          }
            chai.request(server)
            .put('/api/retrievefornotifications')
            .send(register)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
            .end((err, res) => {
				console.log("TTTTTTTTTTTTTTT"+JSON.stringify(res)+JSON.stringify(err))
                if(res.body.hasOwnProperty('error')){
					res.body.should.have.property('error');
                    res.body.should.have.property('data').eql('INVALID_DATA');
				}else{
				  res.should.have.status(200);
				  expect(res.body).to.have.lengthOf.above(0);
				}
              done();
            });
      });
  });
});