const service = require('../models/studentTeacherModel');
//import * as TeacherModel from "./models/TeacherModel";
const logger = require("../utils/logger");
const CircularJSON = require('circular-json');
const errorMessages = require("../utils/errorMessages");

const operations = {
	getCommonStudents: (req,res) => {
		const studentTeacherService = service();
		const id = req.query.teacherId;
		return studentTeacherService.commonStudents(id)
			.then((students) => {
				var data = {
					"students": []
				}
				students.map(function (item) {
					data.students.push(item.student.mailId);
				});
				data.students = data.students.filter(function(item, pos) {
					return data.students.indexOf(item) == pos;
				})
				return res.send(data);
			}).catch((error)=>{
				return res.send({
					error:true,
					data:errorMessages[error.name] ? errorMessages[error.name] : 'INVALID_DATA'
				});
		});
		//return data;
	},
	post: (req, res) => {
		//const id = req.params.id;
		const studentTeacherService = service();
		let record = null;
		return studentTeacherService.createStudentTeacherGroup(req)
		  .then((data) => {
			if (data) {
			  record = data;
			  res.status(200).json(record);
			} else {
			  throw new Error('INVALID_DATA');
			}
		  }).catch((error) => {
			return res.send({
				error:true,
				data:errorMessages[error.name] ? errorMessages[error.name] : 'INVALID_DATA'
			});
		});
	},
	put: (req, res) => {
		//const id = req.params.id;
		const studentTeacherService = service();
		let record = null;
		return studentTeacherService.updateStudentTeacherGroup(req)
		  .then((data) => {
			if (data) {
			  record = data;
			  res.status(200).json(record);
			} else {
			  throw new Error('INVALID_DATA');
			}
		  }).catch((error) => {
			return res.send({
				error:true,
				data:errorMessages[error.name] ? errorMessages[error.name] : 'INVALID_DATA'
			});
		});
	},
	delete: (req, res) => {
		const studentTeacherService = service();
		const studentId = req.query.studentId;
		const teacherId = req.query.teacherId;
		let record = null;
		return studentTeacherService.deleteStudentOrTeacherGroup(studentId,teacherId)
		  .then((data) => {
			if (data) {
			  record = data;
			  res.status(200).json(record);
			} else {
			  throw new Error('INVALID_ID');
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