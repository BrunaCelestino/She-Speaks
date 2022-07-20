/* eslint-disable object-shorthand */
const StudentSchema = require('../../models/student/studentSchema');
const TeacherSchema = require('../../models/teacher/teacherSchema');
const AdminSchema = require('../../models/admin/adminSchema');
const ClassroomSchema = require('../../models/plataform/classroomSchema');

const createClassroom = async (req, res) => {
  const {
    classroomName,
    classroomIcon,
    classLink,
    description,
    limitOfStudents,
    language,
    other,
    level,
    learningFoccus,
    DaysOfWeek,
    timeOfTheDay,
  } = req.body;
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });

    if (findTeacher === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details:
          'You need to be a teacher and be logged in to create a classroom',
      });
    }

    if (findTeacher) {
      const newClassroom = new ClassroomSchema({
        classroomName,
        classroomIcon,
        teacher: findTeacher.username,
        classLink,
        description,
        limitOfStudents,
        language,
        other,
        level,
        learningFoccus,
        DaysOfWeek,
        timeOfTheDay,
      });

      await newClassroom.save();

      return res.status(201).json({
        message: 'New classroom successfully created',
        newClassroom,
      });
    }
    return res.status(500).json({
      message: 'We could not create a classroom. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateClassroom = async (req, res) => {
  const {
    classroomName,
    classroomIcon,
    classLink,
    description,
    limitOfStudents,
    language,
    other,
    level,
    learningFoccus,
    DaysOfWeek,
    timeOfTheDay,
  } = req.body;
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });

    if (findTeacher === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details:
          'You need to be a teacher and be logged in to create a classroom',
      });
    }

    const classroomFound = await ClassroomSchema.findById(req.params.id);

    if (classroomFound === null) {
      return res.status(404).json({
        message: 'The classroom update have failed',
        details: `There isn't a classroom with the id: ${req.params.id}, in the database.`,
      });
    }

    if (classroomFound.teacher !== findTeacher.username) {
      return res.status(403).json({
        message: 'The classroom update have failed',
        details: `Only the classroom teacher ${classroomFound.teacher} can update this classroom.`,
      });
    }

    classroomFound.classroomName = classroomName || classroomFound.classroomName;
    classroomFound.classroomIcon = classroomIcon || classroomFound.classroomIcon;
    classroomFound.classLink = classLink || classroomFound.classLink;
    classroomFound.description = description || classroomFound.description;
    classroomFound.limitOfStudents = limitOfStudents || classroomFound.limitOfStudents;
    classroomFound.language = language || classroomFound.language;
    classroomFound.other = other || classroomFound.other;
    classroomFound.level = level || classroomFound.level;
    classroomFound.learningFoccus = learningFoccus || classroomFound.learningFoccus;
    classroomFound.DaysOfWeek = DaysOfWeek || classroomFound.DaysOfWeek;
    classroomFound.timeOfTheDay = timeOfTheDay || classroomFound.timeOfTheDay;
    const savedClassroom = await classroomFound.save();

    const findUpdate = await ClassroomSchema.find(savedClassroom);

    return res.status(200).json({
      message: 'Classroom successfully updated',
      findUpdate,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllClassrooms = async (req, res) => {
  try {
    const classroomsFound = await ClassroomSchema.find();

    if (!classroomsFound) {
      return res.status(500).json({
        message: 'We could not load your friends list. Please try again later',
      });
    }

    return res.status(200).json({
      message: 'Here are all the classrooms.',
      classroomsFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findClassroomById = async (req, res) => {
  try {
    const classroomFound = await ClassroomSchema.findById(req.params.id);

    if (!classroomFound) {
      return res.status(404).json({
        message: 'We could not find the classroom.',
        details: `There isn't a classroom with the id: ${req.params.id}, in the database.`,
      });
    }
    return res.status(200).json({
      message: 'Here is the classroom you were looking for:',
      classroomFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findClassroomByFilters = async (req, res) => {
  const {
    limitOfStudents,
    language,
    other,
    level,
    learningFoccus,
    DaysOfWeek,
    timeOfTheDay,
    status,
  } = req.query;
  try {
    let classroomFound = await ClassroomSchema.find();
    if (limitOfStudents) {
      classroomFound = await ClassroomSchema.find({
        limitOfStudents: limitOfStudents,
      });
    }

    if (language) {
      classroomFound = await ClassroomSchema.find({
        language: { $regex: language, $options: 'i' },
      });
    }

    if (other) {
      classroomFound = await ClassroomSchema.find({
        other: { $regex: other, $options: 'i' },
      });
    }

    if (level) {
      classroomFound = await ClassroomSchema.find({
        level: { $regex: level, $options: 'i' },
      });
    }

    if (learningFoccus) {
      classroomFound = await ClassroomSchema.find({
        learningFoccus: { $regex: learningFoccus, $options: 'i' },
      });
    }
    if (DaysOfWeek) {
      classroomFound = await ClassroomSchema.find({
        DaysOfWeek: { $regex: DaysOfWeek, $options: 'i' },
      });
    }
    if (timeOfTheDay) {
      classroomFound = await ClassroomSchema.find({
        timeOfTheDay: { $regex: timeOfTheDay, $options: 'i' },
      });
    }

    if (status) {
      classroomFound = await ClassroomSchema.find({
        status: { $regex: status, $options: 'i' },
      });
    }

    if (classroomFound.length === 0) {
      return res.status(404).json({
        message: 'We could not find any results.',
        details:
          "There isn't a classroom with the this criteria in the database.",
      });
    }
    return res.status(200).json({
      message: 'Here are the classrooms you were looking for:',
      query: req.query,
      details: `We have found - ${classroomFound.length} - result(s) based on your search.`,
      classroomFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteClassroom = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });

    if (findTeacher === null && findAdmin === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details:
          'You need to be a teacher and be logged in to create a classroom',
      });
    }
    const classroomFound = await ClassroomSchema.findById(req.params.id);

    if (!classroomFound) {
      return res.status(404).json({
        message: 'We could not find the classroom.',
        details: `There isn't a classroom with the id: ${req.params.id}, in the database.`,
      });
    }
    if (findTeacher) {
      if (classroomFound.teacher !== findTeacher.username) {
        return res.status(403).json({
          message: 'The classroom delete have failed',
          details: `Only the classroom teacher ${classroomFound.teacher} can delete this classroom.`,
        });
      }
    }

    await classroomFound.delete();

    return res.status(200).json({
      message: 'Classroom successfully deleted:',
      classroomFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAClassroomMatch = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findStudent = await StudentSchema.findOne({ token: token });

    if (findStudent === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details:
          'You need to be a student and be logged in to find your match.',
      });
    }

    const classroomFound = await ClassroomSchema.findOne({
      $and: [
        {
          $or: [
            { language: findStudent.chosenLanguage },
            { other: findStudent.other },
          ],
        },
        { level: findStudent.languageLevel },
        { learningFoccus: findStudent.learningInterest },
        { DaysOfWeek: findStudent.freeDaysOfWeek },
        { timeOfTheDay: findStudent.timeOfTheDay },
        { $or: [{ status: 'empty' }, { status: 'open' }] },
      ],
    });

    if (!classroomFound) {
      return res.status(404).json({
        message: 'We could not find any results.',
        details:
          "You don't have a match yet. Try to find a classroom using the filters.",
      });
    }
    return res.status(200).json({
      message: 'You have a match!',
      classroomFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const enrollInAClassroom = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findStudent = await StudentSchema.findOne({ token: token });

    const classroomFound = await ClassroomSchema.findById(req.params.id);

    if (!classroomFound) {
      return res.status(404).json({
        message: 'We could not find the classroom.',
        details: `There isn't a classroom with the id: ${req.params.id}, in the database.`,
      });
    }

    if (classroomFound.status === 'full') {
      return res.status(400).json({
        message: 'You cannot enroll in this classroom. It is full.',
      });
    }
    const { students } = classroomFound;

    if (
      (students.length < classroomFound.limitOfStudents)
      && (classroomFound.status !== 'full' || classroomFound.status !== 'closed')
    ) {
      if (findStudent) {
        if (students.length !== 0) {
          const checkIfAlreadyStudent = students.find(
            (student) => student.username === findStudent.username,
          );
          if (checkIfAlreadyStudent) {
            return res.status(400).json({
              message: 'You are already enrolled in this classroom',
            });
          }
        }

        students.push({
          _id: findStudent.id,
          username: findStudent.username,
        });

        classroomFound.status = 'open';

        if (classroomFound.students.length === classroomFound.limitOfStudents) {
          classroomFound.status = 'full';
        }

        await classroomFound.save();
        return res.status(200).json({
          message: `You successfully enrolled in the classroom ${req.params.id}`,
          classroomFound,
        });
      }
    }
    return res.status(500).json({
      message: 'We could not complete your request. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const leaveAClassroom = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findStudent = await StudentSchema.findOne({ token: token });
    const classroomFound = await ClassroomSchema.findById(req.params.id);

    if (!classroomFound) {
      return res.status(404).json({
        message: 'We could not find the classroom.',
        details: `There isn't a classroom with the id: ${req.params.id}, in the database.`,
      });
    }
    const { students } = classroomFound;
    if (findStudent) {
      if (students.length === 0) {
        return res.status(400).json({
          message: 'You are not enrolled in this classroom',
        });
      }
      if (students.length !== 0) {
        const checkIfStudentExists = students.find(
          (student) => student.username === findStudent.username,
        );
        if (!checkIfStudentExists) {
          return res.status(400).json({
            message: 'You are not enrolled in this classroom',
          });
        }

        const index = students.indexOf(checkIfStudentExists);

        students.splice(index, 1);

        classroomFound.status = 'open';
        if (students.length === 0) {
          classroomFound.status = 'empty';
        }
        await classroomFound.save();
        return res.status(200).json({
          message: `You successfully left the classroom ${req.params.id}`,
          classroomFound,
        });
      }
    }
    return res.status(500).json({
      message: 'We could not complete your request. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClassroom,
  updateClassroom,
  getAllClassrooms,
  findClassroomById,
  deleteClassroom,
  findClassroomByFilters,
  findAClassroomMatch,
  enrollInAClassroom,
  leaveAClassroom,
};
