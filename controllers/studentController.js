const service = require('../models/studentModel');
//import * as studentModel from "./models/studentModel";
const logger = require("../utils/logger");
const errorMessages = require("../utils/errorMessages");

const operations = {
	// get all studenets
	getStudents: (req,res) => {
		const studentService = service();
		let data = studentService.getStudents();
		data.then((students) => {
			return res.send(students);
		}).catch((error)=>{
			return res.send({
				error:true,
				data:errorMessages[error.name] ? errorMessages[error.name] : 'INVALID_DATA'
			});
		});
		//return data;
	},
	// Insert studenet details
	post: (req, res) => {
		//const id = req.params.id;
		const studentService = service();
		let record = null;
		return studentService.createStudent(req)
		  .then((data) => {
			if (data) {
			  record = data;
			  res.status(200).json(record);
			} else {
			  throw new Error('INVALID_Student_ID');
			}
		  }).catch((error) => {
			return res.send({
				error:true,
				data:errorMessages[error.name] ? errorMessages[error.name] : 'INVALID_DATA'
			});
		});
	},
	//update student detals, based on student id 
	put: (req, res) => {
		//const id = req.params.id;
		const studentService = service();
		let record = null;
		return studentService.updateStudent(req)
		  .then((data) => {
			if (data) {
			  record = data;
			  res.status(200).json(record);
			} else {
			  throw new Error('INVALID_Student_ID');
			}
		  }).catch((error) => {
			return res.send({
				error:true,
				data:errorMessages[error.name] ? errorMessages[error.name] : 'INVALID_DATA'
			});
		});
	},
	//delete student, based on request id
	delete: (req, res) => {
		const studentService = service();
		const id = req.params.studentId;
		let record = null;
		return studentService.deleteStudent(id)
		  .then((data) => {
			if (data) {
			  record = data;
			  res.status(200).json(record);
			} else {
			  throw new Error('INVALID_Student_ID');
			}
		  }).catch((error) => {
			return res.send({
				error:true,
				data:errorMessages[error.name] ? errorMessages[error.name] : 'INVALID_DATA'
			});
		});
	},
}
module.exports = operations;
