const SequelizeUtil = require('../utils/sequelizeUtil');
const Sequelize = require('sequelize');
/* eslint-disable */
const EVTC = 'Student Teacher Realtion Service';
const logger = require("../utils/logger");
const config = require("../utils/config");

const students_TeachersSequelizeService = () => {
	logger.info(EVTC, 'Initialized Students_Teachers Service');
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
	
  const StudentTeacherGroup = sequelize.define('TB_StudentTeacherGroup', {
        id: {
		  type: Sequelize.BIGINT,
		  primaryKey: true,
		  allowNull: false,
		  autoIncrement: true,
		  unique: true
		},
		studentId: {
            type: Sequelize.BIGINT,
            allowNull: false,
			references: {
				model: 'Students',
				key: 'id'
			}
        },
        teacherId: {
            type: Sequelize.BIGINT,
            allowNull: false,
			references: {
				model: 'Teachers',
				key: 'id'
			}
        }
    });
	// many-to-many association
	StudentTeacherGroup.belongsTo(Teachers, { as: 'teacher', foreignKey: 'studentId' });
	StudentTeacherGroup.belongsTo(Students, { as: 'student', foreignKey: 'studentId' });
	
    // Retrieves common students list from relation(TB_StudentTeacherGroup) table, with or without teacher id
    function commonStudents(teacherId) {
		if(teacherId){
			return StudentTeacherGroup.findAll({
				include: [{
					model: Students,
					attributes: ['mailId'],
					as: 'student'
				}],
				attributes:[],
				where:{
					teacherId
				}
			});
		}else{
			return StudentTeacherGroup.findAll({
				include: [{
					model: Students,
					attributes: ['mailId'],
					as: 'student'
				}],
				attributes:[]
			});
		}
    }
	
    // Register student to teacher in relation(TB_Student) table 
    function createStudentTeacherGroup(req) {
        return StudentTeacherGroup.create({
			id: req.body.id,
            studentId: req.body.studentId,
            teacherId: req.body.teacherId,
        },
        );
    }

    // Update student or teacher details in relation(TB_Student) table, based on student id
    function updateStudentTeacherGroup(req) {
        return StudentTeacherGroup.update({
			id: req.body.id,
            studentId: req.body.studentId,
            teacherId: req.body.teacherId,
        },
        { where: {
            studentId: req.body.studentId,
        },
        });
    }

    // Suspend a particular student in relation(TB_Student) table, to a particulat teacher, based on ids
    function deleteStudentOrTeacherGroup(studentId,teacherId) {
        return StudentTeacherGroup.destroy({
            where: {
                studentId,
		teacherId
            },
        });
    }
    return {
        commonStudents,
        createStudentTeacherGroup,
        updateStudentTeacherGroup,
        deleteStudentOrTeacherGroup,
    };
};
module.exports = students_TeachersSequelizeService;
/* eslint-enable */


