const SequelizeUtil = require('../utils/sequelizeUtil');
const Sequelize = require('sequelize');
/* eslint-disable */
const EVTC = 'studentService';
const logger = require("../utils/logger");
const config = require("../utils/config");

const studentSequelizeService = () => {
  logger.info(EVTC, 'Initialized student Service');
  const sequelize = SequelizeUtil(config, logger).getConnection();

  const Students = sequelize.define('TB_Student', {
        studentId: {
            type: Sequelize.BIGINT,
            field: 'studentId',
            primaryKey: true,
        },
		name: {
            type: Sequelize.STRING,
            field: 'name',
        },
        mailId: {
            type: Sequelize.STRING,
            field: 'mailId',
        }
    });
	
	Students.schema(config.databases.postgres.schema);
    // Entity based code
    function getStudents() {
       return Students.findAll();
    }

    function getStudent(id) {
        logger.info(EVTC+ `Searching for a student based on id:${id}`);
        return Students.findAll({
            where: {
                studentId: id,
            },
        });
    }

    function createStudent(req) {
        logger.info(EVTC, 'req.body.id  %s', req.body.StudentId);
        return Students.create({
            studentId: req.body.studentId,
			name: req.body.name,
            mailId: req.body.mailId,
        },
        );
    }

    function updateStudent(req) {
        return Students.update({
            name: req.body.name,
            mailId: req.body.mailId,
        },
        { where: {
            studentId: req.body.studentId,
        },
        });
    }

    function deleteStudent(studentId) {
        return Students.destroy({
            where: {
                studentId,
            },
        });
    }
    return {
        getStudents,
        getStudent,
        createStudent,
        updateStudent,
        deleteStudent,
    };
};
module.exports = studentSequelizeService;
/* eslint-enable */


