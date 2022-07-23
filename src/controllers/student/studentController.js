/* eslint-disable object-shorthand */
const StudentSchema = require('../../models/student/studentSchema');
const TeacherSchema = require('../../models/teacher/teacherSchema');
const AdminSchema = require('../../models/admin/adminSchema');
const StudentsPreRegisterSchema = require('../../models/student/studentsPreRegisterSchema');

const createNewStudent = async (req, res) => {
  const {
    profilePicture,
    username,
    chosenLanguage,
    languageLevel,
    other,
    learningInterest,
    freeDaysOfWeek,
    timeOfTheDay,
    email,
  } = req.body;

  try {
    const newStudentRegister = new StudentSchema({
      profilePicture,
      username,
      preRegister: req.params.id,
      chosenLanguage,
      languageLevel,
      other,
      learningInterest,
      freeDaysOfWeek,
      timeOfTheDay,
      email,
      password: req.body.password,
    });

    const findStudentByUsername = await StudentSchema.exists({
      username: req.body.username,
    });

    const findTeacherByUsername = await TeacherSchema.exists({
      username: req.body.username,
    });

    if (findStudentByUsername || findTeacherByUsername) {
      return res.status(409).json({
        message: 'The registration of the new student have failed',
        details: 'Conflict',
      });
    }
    const findStudentByEmail = await StudentSchema.exists({
      email: req.body.email,
    });

    if (findStudentByEmail) {
      return res.status(409).json({
        message: 'The registration of the new student have failed',
        details: 'Conflict',
      });
    }

    const checkPreRegisterStatus = await StudentsPreRegisterSchema.findById(
      req.params.id,
    );

    if (checkPreRegisterStatus.applicationStatus !== 'approved') {
      return res.status(409).json({
        message: 'The registration of the new student have failed',
        details: `Your pre-register status is: ${checkPreRegisterStatus.applicationStatus}. You must be approved before signing up.`,
      });
    }

    await newStudentRegister.save();

    const findNewStudent = await StudentSchema.find(newStudentRegister)
      .populate('preRegister').populate('favorites')
      .select('-classroom -friendsList');

    return res.status(201).json({
      message: 'Register successfully created',
      findNewStudent,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findProfileByUsername = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findAdmin = await AdminSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });

    if (
      (findStudent !== null && findStudent.username !== req.params.username)
      || (findAdmin !== null && findAdmin.role !== 'admin')
    ) {
      const studentFound = await StudentSchema.findOne({
        username: req.params.username,
      }).select(
        '-_id -preRegister -freeDaysOfWeek -timeOfTheDay -email -password -token -createdAt -updatedAt -__v -favorites',
      );
      if (studentFound === null) {
        return res.status(404).json({
          message: 'It was not possible to find this student profile.',
          details: 'Not Found',
        });
      }
      return res.status(200).json({
        message: 'Student successfully located.',
        studentFound,
      });
    }
    const studentFound = await StudentSchema.findOne({
      username: req.params.username,
    }).populate('preRegister');

    if (studentFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find this student profile.',
        details: 'Not Found',
      });
    }

    return res.status(200).json({
      message: 'Student successfully located.',
      studentFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  const {
    profilePicture,
    username,
    chosenLanguage,
    languageLevel,
    other,
    learningInterest,
    freeDaysOfWeek,
    timeOfTheDay,
    email,
  } = req.body;
  try {
    const studentFound = await StudentSchema.findById(req.params.id);

    if (studentFound === null) {
      return res.status(404).json({
        message: 'The student profile update have failed',
        details: 'Not Found',
      });
    }

    const findStudentByUsername = await StudentSchema.exists({
      username: req.body.username,
    });

    if (findStudentByUsername) {
      return res.status(409).json({
        message: 'The update of your student profile have failed',
        details: 'Conflict',
      });
    }

    studentFound.profilePicture = profilePicture || studentFound.profilePicture;
    studentFound.username = username || studentFound.username;
    studentFound.chosenLanguage = chosenLanguage || studentFound.chosenLanguage;
    studentFound.languageLevel = languageLevel || studentFound.languageLevel;
    studentFound.other = other || studentFound.other;
    studentFound.learningInterest = learningInterest || studentFound.learningInterest;
    studentFound.freeDaysOfWeek = freeDaysOfWeek || studentFound.freeDaysOfWeek;
    studentFound.timeOfTheDay = timeOfTheDay || studentFound.timeOfTheDay;
    studentFound.email = email || studentFound.email;
    studentFound.password = req.body.password || studentFound.password;

    const savedStudent = await studentFound.save();

    const findUpdate = await StudentSchema.find(savedStudent).populate('preRegister');

    return res.status(200).json({
      message: 'Student profile successfully updated',
      findUpdate,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const StudentFound = await StudentSchema.findById(req.params.id);

    if (StudentFound === null) {
      return res.status(404).json({
        message: 'It was not possible to delete the student profile',
        details: 'Not Found',
      });
    }

    await StudentFound.delete();

    return res.status(200).json({
      message: 'Student profile successfully deleted',
      StudentFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewStudent,
  findProfileByUsername,
  updateStudent,
  deleteStudent,
};
