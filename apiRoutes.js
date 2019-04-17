const studentRoute = '/getStudents';
const createStudentRoute = '/registerNewStudent';
const updateStudentRoute = '/updateStudent';
const deleteStudentRoute = '/deRegisterStudent/:studentId';

const teacherRoute = '/getTeachers';
const createTeacherRoute = '/registerNewTeacher';
const updateTeacherRoute = '/updateTeacher';
const deleteTeacherRoute = '/deRegisterTeacher/:teacherId';

const commonStudents = '/commonStudents';
const register = '/register';
const retrievefornotifications = '/retrievefornotifications';
const suspend = '/suspend';

const express = require('express');
const studentController = require('./controllers/studentController');
const teacherController = require('./controllers/teacherController');
const studentTeacherController = require('./controllers/studentTeacherController')

const router = express.Router();
const logger = require("./utils/logger");

const apiRoutes = (app, logger) => {
	router.route(studentRoute).get([
		studentController.getStudents
	]);
	router.route(createStudentRoute).post([
		studentController.post
	]);
	router.route(updateStudentRoute).put([
		studentController.put
	]);
	router.route(deleteStudentRoute).delete([
		studentController.delete
	]);
	router.route(teacherRoute).get([
		teacherController.getTeachers
	]);
	router.route(createTeacherRoute).post([
		teacherController.post
	]);
	router.route(updateTeacherRoute).put([
		teacherController.put
	]);
	router.route(deleteTeacherRoute).delete([
		teacherController.delete
	]);
	router.route(commonStudents).get([
		studentTeacherController.getCommonStudents
	]);
	router.route(register).post([
		studentTeacherController.post
	]);
	router.route(retrievefornotifications).put([
		studentTeacherController.put
	]);
	router.route(suspend).delete([
		studentTeacherController.delete
	]);
	app.use('/api',router);
};

module.exports = apiRoutes;