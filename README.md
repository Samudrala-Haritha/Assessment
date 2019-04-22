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

Service 
1 To get common students 
          req: http://localhost:9000/api/getStudents
	  res-success: [{"maildId": "test@gmail.com"},
	  {"maildId": "hari@gmail.com"}]
	  res-error: {"error": true, "data": "Related Error Message"}
1.2 To get common students where teaher id is given
	  req: http://localhost:9000/api/getStudents?teacherId=1
	  res-success: [{"maildId": "test@gmail.com"}]
	  res-error: {"error": true, "data": "Related Error Message"}
	  
2. To register new student 
          req: http://localhost:9000/api/register
	  req-body: {"id": 3, "studentId": "hari " "teacherId": "Ranjit@gmail.com"}
	  res-success:{1}
	  res-error: {"error": true, "data": "Related Error Message"}
	  
3. Update student teacher mapping relation 
	  req: http://localhost:9000/api/retrievefornotifications
	  req-body: {"id": 4, "studentId": "hari " "teacherId": "teacher1@gmail.com"}
	  res-success:{1}
	  res-error: {"error": true, "data": "Related Error Message"}
	  
4. To suspend student from  teacher
          req: http://localhost:9000/api/suspend?studentId:1&teacherId=2
	  res-success: {1}
	  res-error: {"error": true, "data": "Related Error Message"}
	  
	
