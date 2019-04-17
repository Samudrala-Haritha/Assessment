const SequelizeUtil = require('./sequelizeUtil');
const Sequelize = require('sequelize');
/* eslint-disable */
const EVTC = 'userService';
const logger = require("./logger");
const config = require("./config");

const userSequelizervice = () => {
  logger.info(EVTC, 'Initialized User Service');
  const sequelize = SequelizeUtil(config, logger).getConnection();

  const Student = sequelize.define('Student', {
  // Sequelize.STRING,  Sequelize.DATE, Sequelize.BIGINT , Sequelize.JSON
        Id: {
            type: Sequelize.BIGINT,
            field: 'Id',
            autoIncrement: true,
            primaryKey: true,
        },
        mailId: {
            type: Sequelize.STRING,
            field: 'mailId',
        },
        teacherId: {
            type: Sequelize.BIGINT,
            field: 'teacherId',
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'creat_ts',
            defaultValue: sequelize.literal('NOW()'),
            timestamps: true,
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'lst_updt_ts',
            defaultValue: sequelize.literal('NOW()'),
            timestamps: true }
    });
  Student.schema(config.databases.postgres.schema);
    // Entity based code
    function getStudents() {
		logger.info('@@@@@@@@@@@@@@@@@@3' +Student.findAll());
       return Student.findAll();
    }

    function getStudent(id) {
        logger.info(EVTC+ `Searching for a user based on id:${id}`);
        return Student.findAll({
            where: {
                Id: id,
            },
        });
    }

    function createUser(req) {
        logger.info(EVTC, 'req.body.market_id  %s', req.body.marketId);
        return Student.create({
            Id: req.body.id,
            mailId: req.body.mailId,
            teacherId: req.body.teacherId,
            createdAt: sequelize.literal('NOW()'),
            modifiedAt: sequelize.literal('NOW()'),
        },
        );
    }

    function updateUser(req) {
        return User.update({
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
            modifiedAt: sequelize.literal('NOW()'),
        },
        { where: {
            id: req.body.id,
        },
        });
    }

    function deleteUser(id) {
        return User.destroy({
            where: {
                id,
            },
        });
    }
    return {
        getStudents,
        getStudent,
        createUser,
        updateUser,
        deleteUser,
    };
};
module.exports = userSequelizervice;
/* eslint-enable */


