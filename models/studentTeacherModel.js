const SequelizeUtil = require('../utils/sequelizeUtil');
const Sequelize = require('sequelize');
/* eslint-disable */
const EVTC = 'Student Teacher Realtion Service';
const logger = require("../utils/logger");
const config = require("../utils/config");

const students_TeachersSequelizeService = () => {
  logger.info(EVTC, 'Initialized Students_Teachers Service');
  const sequelize = SequelizeUtil(config, logger).getConnection();

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
    // Entity based code
    function commonStudents(id) {
		if(id){
			return StudentTeacherGroup.findAll({
				where: {
					teacherId: id,
				},
			});
		}else{
			return StudentTeacherGroup.findAll();
		}
    }

    function createStudentTeacherGroup(req) {
        return StudentTeacherGroup.create({
			id: req.body.id,
            studentId: req.body.studentId,
            teacherId: req.body.teacherId,
        },
        );
    }

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


