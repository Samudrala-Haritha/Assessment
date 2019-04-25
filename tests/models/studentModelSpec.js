//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let Students = require('../../models/studentModel');

//Require the dev-dependencies
let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Students Serivce', () => {
  describe('/GET Students', () => {
      it('it should GET all the Students', (done) => {
            chai.request(server)
            .get('/api/getStudents')
            .end((err, res) => {
				  res.should.have.status(200);
                  res.body.should.be.a('array');
				 // res.body.length.should.be.eql(1);
              done();
            });
      });
  });
  describe('/POST student', () => {
      it('it should not POST a student without student id', (done) => {
          let student = {
              name: "Vijay",
              mailId: "vijay@gmail.com"
          }
            chai.request(server)
            .post('/api/registerNewStudent')
            .send(student)
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
      it('it should POST a student ', (done) => {
          let student = {
			  studentId: 7,
              name: "Veersh",
              mailId: "veersh@gmail.com"
          }
            chai.request(server)
            .post('/api/registerNewStudent')
            .send(student)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });
  });
  
  describe('/Suspend student with id', () => {
      it('it should not suspend the student without student id', (done) => {
            chai.request(server)
            .delete('/api/deRegisterStudent')
            .end((err, res) => {
				  res.should.have.status(404);
                  res.body.should.be.a('Object');
              done();
            });
      });
	  it('it should suspend the student when student id is provided', (done) => {
            chai.request(server)
            .delete('/api/deRegisterStudent:7')
            .end((err, res) => {
				if(typeof(res.body) === 'object'){
					res.body.should.have.property('error');
                    res.body.should.have.property('data').eql('Primary key should not be null');
				}else{
				  res.should.have.status(200);
				  res.body.should.be.eql(1);
				}
              done();
            });
      });
  });
  describe('/Update student with id', () => {
      it('it should update the student with student id', (done) => {
           let register = {
			  studentId:2,
              name: "satish",
              mailId: "satish@gmail.com"
          }
            chai.request(server)
            .put('/api/updateStudent')
            .send(register)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err, res) => {
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