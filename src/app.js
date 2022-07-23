const express = require('express');

const app = express();
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');

db.connect();

const swaggerDocument = require('./swagger.json');
const adminRoutes = require('./routes/admin/adminRoutes');
const studentsPreRegisterRoutes = require('./routes/student/studentsPreRegisterRoutes');
const studentRoutes = require('./routes/student/studentRoutes');
const teachersPreRegisterRoutes = require('./routes/teacher/teachersPreRegisterRoutes');
const platformRoutes = require('./routes/platform/platformRoutes');
const teacherRoutes = require('./routes/teacher/teacherRoutes');
const postRoutes = require('./routes/platform/postsRoutes');
const messagesRoutes = require('./routes/platform/messagesRoutes');
const friendsListRoutes = require('./routes/platform/friendsListRoutes');
const classroomRoutes = require('./routes/platform/classroomRoutes');
const index = require('./routes/indexRoutes');

app.use(express.json());

app.use('/', index);
app.use('/admin', adminRoutes);
app.use('/platform', platformRoutes, postRoutes, messagesRoutes, friendsListRoutes, classroomRoutes);
app.use('/student', studentRoutes, studentsPreRegisterRoutes);
app.use('/teacher', teachersPreRegisterRoutes, teacherRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
