const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminSchema = require('../../models/admin/adminSchema');
const StudentSchema = require('../../models/student/studentSchema');
const TeacherSchema = require('../../models/teacher/teacherSchema');

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

module.exports = {
  adminSignIn,
  studentSignIn,
  teacherSignIn,
};
