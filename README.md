Project Title: Students-Teachers Assessment
description: Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.
Prerequisites: Need to install the following softwares for this assessment
1. NodesJs - https://nodejs.org/en/download/(server side coding)
2. PostgreSQL - https://www.postgresql.org/download/(Database)
3. Sequelize ORM - npm install sequelize(MiddleWare to connect server with database)
3. IDE: Eclipse or notepad++
4. Postman - Rest Client API

Setup
1. Import code from 'https://github.com/Samudrala-Haritha/Assessment'
2. Install node modules using 'npm install'
	'package.json' have dependent node modules
3. start the app using 'node start.js'
4. Open database and create the following tableStudent
	Student(TB_Student)
	Teacher(TB_Teacher) 
	Realationship table (TB_StudentTeacherGroup)
	Note: Models have the related tables and columns
5. 'apiRoutes.js' have the service urls. Test them using postman, you will get the corresponding response or related error message.
