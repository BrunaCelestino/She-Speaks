/* eslint-disable object-shorthand */
const TeacherSchema = require('../../models/teacher/teacherSchema');
const StudentSchema = require('../../models/student/studentSchema');
const AdminSchema = require('../../models/admin/adminSchema');
const TeachersPreRegisterSchema = require('../../models/teacher/teachersPreRegisterSchema');

const createNewTeacher = async (req, res) => {
  const {
    profilePicture,
    username,
    chosenLanguage,
    other,
    LanguageLevelToTeach,
    teachingInterest,
    freeDaysOfWeek,
    timeOfTheDay,
    email,
  } = req.body;

  try {
    const newTeacherRegister = new TeacherSchema({
      profilePicture,
      username,
      preRegister: req.params.id,
      chosenLanguage,
      LanguageLevelToTeach,
      other,
      teachingInterest,
      freeDaysOfWeek,
      timeOfTheDay,
      email,
      password: req.body.password,
    });

    const findTeacherByUsername = await TeacherSchema.exists({
      username: req.body.username,
    });
    const findStudentByUsername = await StudentSchema.exists({
      username: req.body.username,
    });

    if (findTeacherByUsername || findStudentByUsername) {
      return res.status(409).json({
        message: 'The registration of the new teacher have failed',
        details: 'Conflict',
      });
    }
    const findTeacherByEmail = await TeacherSchema.exists({
      email: req.body.email,
    });

    if (findTeacherByEmail) {
      return res.status(409).json({
        message: 'The registration of the new teacher have failed',
        details: 'Conflict',
      });
    }

    const checkPreRegisterStatus = await TeachersPreRegisterSchema.findById(req.params.id);

    if (checkPreRegisterStatus.applicationStatus !== 'approved') {
      return res.status(409).json({
        message: 'The registration of the new Teacher have failed',
        details: `Your pre-register status is: ${checkPreRegisterStatus.applicationStatus}. You must be approved before signing up.`,
      });
    }

    await newTeacherRegister.save();

    const findNewTeacher = await TeacherSchema.find(newTeacherRegister)
      .populate('preRegister').populate('favorites')
      .select('-classroom -friendsList');

    return res.status(201).json({
      message: 'Register successfully created',
      findNewTeacher,
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
    const findTeacher = await TeacherSchema.findOne({ token: token });

    if (
      (findTeacher !== null && findTeacher.username !== req.params.username)
      || (findAdmin !== null && findAdmin.role !== 'admin')
    ) {
      const teacherFound = await TeacherSchema.findOne({
        username: req.params.username,
      }).select(
        '-_id -preRegister -freeDaysOfWeek -timeOfTheDay -email -password -token -createdAt -updatedAt -__v -favorites',
      );
      if (teacherFound === null) {
        return res.status(404).json({
          message: 'It was not possible to find this teacher profile.',
          details: 'Not found',
        });
      }
      return res.status(200).json({
        message: `Teacher: -${teacherFound.username}- successfully located.`,
        teacherFound,
      });
    }

    const teacherFound = await TeacherSchema.findOne({
      username: req.params.username,
    }).populate('preRegister').populate('favorites');

    if (teacherFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find this teacher profile.',
        details: 'Not Found',
      });
    }

    return res.status(200).json({
      message: `Teacher: -${teacherFound.username}- successfully located.`,
      teacherFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTeacher = async (req, res) => {
  const {
    profilePicture,
    username,
    chosenLanguage,
    other,
    LanguageLevelToTeach,
    teachingInterest,
    freeDaysOfWeek,
    timeOfTheDay,
    email,
  } = req.body;
  try {
    const teacherFound = await TeacherSchema.findById(req.params.id);

    if (teacherFound === null) {
      return res.status(404).json({
        message: 'The teacher profile update have failed',
        details: 'Not Found',
      });
    }

    const findTeacherByUsername = await TeacherSchema.exists({
      username: req.body.username,
    });

    if (findTeacherByUsername) {
      return res.status(409).json({
        message: 'The update of your teacher profile have failed',
        details: 'Conflict',
      });
    }

    teacherFound.profilePicture = profilePicture || teacherFound.profilePicture;
    teacherFound.username = username || teacherFound.username;
    teacherFound.chosenLanguage = chosenLanguage || teacherFound.chosenLanguage;
    teacherFound.LanguageLevelToTeach = LanguageLevelToTeach || teacherFound.LanguageLevelToTeach;
    teacherFound.other = other || teacherFound.other;
    teacherFound.teachingInterest = teachingInterest || teacherFound.teachingInterest;
    teacherFound.freeDaysOfWeek = freeDaysOfWeek || teacherFound.freeDaysOfWeek;
    teacherFound.timeOfTheDay = timeOfTheDay || teacherFound.timeOfTheDay;
    teacherFound.email = email || teacherFound.email;
    teacherFound.password = req.body.password || teacherFound.password;

    const savedTeacher = await teacherFound.save();

    const findUpdate = await TeacherSchema.find(savedTeacher).populate('preRegister');

    return res.status(200).json({
      message: 'Teacher profile successfully updated',
      findUpdate,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const teacherFound = await TeacherSchema.findById(req.params.id);

    if (teacherFound === null) {
      return res.status(404).json({
        message: 'It was not possible to delete the teacher profile',
        details: 'Not Found',
      });
    }

    await teacherFound.delete();

    return res.status(200).json({
      message: `Teacher profile: ${teacherFound.username}, successfully deleted`,
      teacherFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewTeacher,
  findProfileByUsername,
  updateTeacher,
  deleteTeacher,
};
