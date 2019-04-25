//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let Teachers = require('../../models/teacherModel');

//Require the dev-dependencies
let chai = require('chai');
let expect = chai.expect;
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
  
  
  describe('/Suspend teacher with teacher id', () => {
      it('it should not suspend the teacher without teacher id', (done) => {
            chai.request(server)
            .delete('/api/deRegisterTeacher')
            .end((err, res) => {
				  res.should.have.status(404);
                  res.body.should.be.a('Object');
              done();
            });
      });
	  it('it should suspend the teacher when id is provided', (done) => {
            chai.request(server)
            .delete('/api/deRegisterTeacher:7')
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
  describe('/Update teacher with id', () => {
      it('it should update the teacher with teacher id', (done) => {
           let register = {
			  teacherId:2,
              name: "Guru",
              mailId: "guru@gmail.com"
          }
            chai.request(server)
            .put('/api/updateTeacher')
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