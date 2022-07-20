const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');

db.connect();

const adminRoutes = require('./routes/admin/adminRoutes');
const studentsPreRegisterRoutes = require('./routes/student/studentsPreRegisterRoutes');
const studentRoutes = require('./routes/student/studentRoutes');
const teachersPreRegisterRoutes = require('./routes/teacher/teachersPreRegisterRoutes');
const plataformRoutes = require('./routes/plataform/plataformRoutes');
const teacherRoutes = require('./routes/teacher/teacherRoutes');
const postRoutes = require('./routes/plataform/postsRoutes');
const messagesRoutes = require('./routes/plataform/messagesRoutes');
const friendsListRoutes = require('./routes/plataform/friendsListRoutes');
const classroomRoutes = require('./routes/plataform/classroomRoutes');

app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/plataform', plataformRoutes, postRoutes, messagesRoutes, friendsListRoutes, classroomRoutes);
app.use('/student', studentRoutes, studentsPreRegisterRoutes);
app.use('/teacher', teachersPreRegisterRoutes, teacherRoutes);

module.exports = app;
