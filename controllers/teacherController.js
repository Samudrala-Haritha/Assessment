const service = require('../models/teacherModel');
//import * as TeacherModel from "./models/TeacherModel";
const logger = require("../utils/logger");
const errorMessages = require("../utils/errorMessages");

const operations = {
	// get all teachers
	getTeachers: (req,res) => {
		const teacherService = service();
		let data = teacherService.getTeachers();
		data.then((Teachers) => {
			return res.send(Teachers);
		}).catch((error)=>{
			return res.send({
				error:true,
				data:errorMessages[error.name] ? errorMessages[error.name] : 'INVALID_DATA'
			});
		});
		//return data;
	},
	// Insert teacher details
	post: (req, res) => {
		//const id = req.params.id;
		const teacherService = service();
		let record = null;
		return teacherService.createTeacher(req)
		  .then((data) => {
			if (data) {
			  record = data;
			  res.status(200).json(record);
			} else {
			  throw new Error('INVALID_Teacher_ID');
			}
		  }).catch((error) => {
			return res.send({
				error:true,
				data:errorMessages[error.name] ? errorMessages[error.name] : 'INVALID_DATA'
			});
		});
	},
	//update teacher detals, based on student id 
	put: (req, res) => {
		//const id = req.params.id;
		const teacherService = service();
		let record = null;
		return teacherService.updateTeacher(req)
		  .then((data) => {
			if (data) {
			  record = data;
			  res.status(200).json(record);
			} else {
			  throw new Error('INVALID_Teacher_ID');
			}
		  }).catch((error) => {
			return res.send({
				error:true,
				data:errorMessages[error.name] ? errorMessages[error.name] : 'INVALID_DATA'
			});
		});
	},
	//delete teacher, based on request id
	delete: (req, res) => {
		const teacherService = service();
		const id = req.params.teacherId;
		let record = null;
		return teacherService.deleteTeacher(id)
		  .then((data) => {
			if (data) {
			  record = data;
			  res.status(200).json(record);
			} else {
			  throw new Error('INVALID_Teacher_ID');
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
