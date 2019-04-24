//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let Teachers = require('../../models/teacherModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Teachers Serivce', () => {
  describe('/GET Teachers', () => {
      it('it should GET all the Teachers', (done) => {
            chai.request(server)
            .get('/api/getTeachers')
            .end((err, res) => {
				  res.should.have.status(200);
                  res.body.should.be.a('array');
				 // res.body.length.should.be.eql(1);
              done();
            });
      });
  });
  describe('/POST Teacher', () => {
      it('it should not POST a teacher without teacher id', (done) => {
          let teacher = {
              name: "Suman",
              mailId: "suman@gmail.com"
          }
            chai.request(server)
            .post('/api/registerNewTeacher')
            .send(teacher)
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
      it('it should POST a teacher ', (done) => {
          let teacher = {
			  teacherId: 3,
              name: "Mohan",
              mailId: "mohan@gmail.com"
          }
            chai.request(server)
            .post('/api/registerNewTeacher')
            .send(teacher)
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