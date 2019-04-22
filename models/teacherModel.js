const SequelizeUtil = require('../utils/sequelizeUtil');
const Sequelize = require('sequelize');
/* eslint-disable */
const EVTC = 'Teacher Service';
const logger = require("../utils/logger");
const config = require("../utils/config");

const teacherSequelizeService = () => {
	logger.info(EVTC, 'Initialized Teacher Service');
	const sequelize = SequelizeUtil(config, logger).getConnection();
  
	const Teachers = sequelize.define('TB_Teacher', {
        teacherId: {
            type: Sequelize.BIGINT,
            field: 'teacherId',
            autoIncrement: true,
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
	
    Teachers.schema(config.databases.postgres.schema);
  
    // Retrieves all teachers list from teacher(TB_Teacher) table
    function getTeachers() {
       return Teachers.findAll();
    }

    // Retrieves teacher details from teacher(TB_Teacher) table, based on id 
    function getTeacher(id) {
        logger.info(EVTC+ `Searching for a teacher based on id:${id}`);
        return Teachers.findAll({
            where: {
                teacherId: id,
            },
        });
    }
    
    // Inserts teacher details in teacher(TB_Teacher) table
    function createTeacher(req) {
        logger.info(EVTC, 'req.body.id  %s', req.body.teacherId);
        return Teachers.create({
            teacherId: req.body.teacherId,
			name: req.body.name,
            mailId: req.body.mailId,
        },
        );
    }
	
    // Updates teacher details in teacher(TB_Teacher) table, based on id
    function updateTeacher(req) {
        return Teachers.update({
            name: req.body.name,
            mailId: req.body.mailId,
        },
        { where: {
            teacherId: req.body.teacherId,
        },
        });
    }

    // Deletes  teacher from  teacher(TB_Teacher) table, based on id
    function deleteTeacher(teacherId) {
        return Teachers.destroy({
            where: {
               teacherId,
            },
        });
    }
    return {
        getTeachers,
        getTeacher,
        createTeacher,
        updateTeacher,
        deleteTeacher,
    };
};
module.exports = teacherSequelizeService;
/* eslint-enable */


