//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let Students = require('../../models/studentModel');

//Require the dev-dependencies
let chai = require('chai');
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
});