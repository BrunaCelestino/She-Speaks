/* eslint-disable object-shorthand */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const StudentSchema = require('../../models/student/studentSchema');
const TeacherSchema = require('../../models/teacher/teacherSchema');
const AdminSchema = require('../../models/admin/adminSchema');
const NotificationSchema = require('../../models/platform/notificationSchema');

const { SECRET } = process.env;

const adminSignIn = (req, res) => {
  try {
    const validateLogin = AdminSchema.findOne(
      { email: req.body.email },
      (error, admin) => {
        if (!admin) {
          return res.status(401).json({
            message: 'It was not possible to login',
            details:
              'Check your e-mail and password before trying to login again',
          });
        }
        const validPassword = bcrypt.compareSync(
          req.body.password,
          admin.password,
        );

        if (!validPassword) {
          return res.status(401).json({
            message: 'It was not possible to login',
            details:
              'Check your e-mail and password before trying to login again',
          });
        }
        if (error) {
          res.status(500).json({ message: error.message });
        }
        const token = jwt.sign({ email: admin.email }, SECRET);
        // eslint-disable-next-line no-param-reassign
        admin.token = token;
        admin.save();

        return res.status(200).json({
          message: 'Login authorized.',
          email: admin.email,
          token,
        });
      },
    );
    return validateLogin;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const studentSignIn = (req, res) => {
  try {
    const validateLogin = StudentSchema.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    }).exec((error, user) => {
      if (!user) {
        return res.status(401).json({
          message: 'It was not possible to login',
          details: 'Check your login and password before trying to login again',
        });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!validPassword) {
        return res.status(401).json({
          message: 'It was not possible to login',
          details: 'Check your login and password before trying to login again',
        });
      }

      if (req.body.username) {
        const token = jwt.sign({ username: user.username }, SECRET);
        // eslint-disable-next-line no-param-reassign
        user.token = token;
        user.save();
        return res.status(200).json({
          message: 'Login authorized.',
          username: user.username,
          token,
        });
      }

      if (req.body.email) {
        const token = jwt.sign({ email: user.email }, SECRET);
        // eslint-disable-next-line no-param-reassign
        user.token = token;
        user.save();
        return res.status(200).json({
          message: 'Login authorized.',
          email: user.email,
          token,
        });
      }
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return user;
    });
    return validateLogin;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const teacherSignIn = (req, res) => {
  try {
    const validateLogin = TeacherSchema.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    }).exec((error, user) => {
      if (!user) {
        return res.status(401).json({
          message: 'It was not possible to login',
          details: 'Check your login and password before trying to login again',
        });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!validPassword) {
        return res.status(401).json({
          message: 'It was not possible to login',
          details: 'Check your login and password before trying to login again',
        });
      }

      if (req.body.username) {
        const token = jwt.sign({ username: user.username }, SECRET);
        // eslint-disable-next-line no-param-reassign
        user.token = token;
        user.save();
        return res.status(200).json({
          message: 'Login authorized.',
          username: user.username,
          token,
        });
      }

      if (req.body.email) {
        const token = jwt.sign({ email: user.email }, SECRET);
        // eslint-disable-next-line no-param-reassign
        user.token = token;
        user.save();
        return res.status(200).json({
          message: 'Login authorized.',
          email: user.email,
          token,
        });
      }
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return user;
    });
    return validateLogin;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findAdmin = await AdminSchema.findOne({ token: token });

    if (findAdmin) {
      if (findAdmin.role === 'admin') {
        const studentFound = await StudentSchema.find().populate('preRegister');
        const teacherFound = await TeacherSchema.find().populate('preRegister');

        if (studentFound === null && teacherFound === null) {
          return res.status(404).json({
            message: 'It was not possible to find user profiles.',
            details: 'Not Found',
          });
        }

        return res.status(200).json({
          studentFound,
          teacherFound,
        });
      }
    }
    const studentFound = await StudentSchema.find().select(
      '-_id -preRegister -freeDaysOfWeek -timeOfTheDay -email -password -token -createdAt -updatedAt -__v -favorites -messages',
    );

    const teacherFound = await TeacherSchema.find().select(
      '-_id -preRegister -email -password -token -createdAt -updatedAt -__v -favorites -messages',
    );
    if (studentFound === null && teacherFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find profiles.',
        details: 'Not Found',
      });
    }

    return res.status(200).json({
      studentFound,
      teacherFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyNotifications = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null && findAdmin === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'Forbidden',
      });
    }
    if (findTeacher) {
      const findNotifications = await NotificationSchema.find({
        requested: findTeacher.username,
      });

      if (findNotifications.length === 0) {
        return res.status(404).json({
          message: 'You have no notifications!',
        });
      }
      return res.status(200).json({
        message: 'Here are your notifications:',
        findNotifications,
      });
    }

    if (findStudent) {
      const findNotifications = await NotificationSchema.find({
        requested: findStudent.username,
      });

      if (findNotifications.length === 0) {
        return res.status(404).json({
          message: 'You have no notifications!',
        });
      }
      return res.status(200).json({
        message: 'Here are your notifications:',
        findNotifications,
      });
    }

    if (findAdmin) {
      const findNotifications = await NotificationSchema.find({
        requested: findAdmin.email,
      });

      if (findNotifications.length === 0) {
        return res.status(404).json({
          message: 'You have no notifications!',
        });
      }
      return res.status(200).json({
        message: 'Here are your notifications:',
        findNotifications,
      });
    }
    return res.status(500).json({
      message: 'We could not get your notifications. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  adminSignIn,
  studentSignIn,
  teacherSignIn,
  getAllProfiles,
  getMyNotifications,
};
