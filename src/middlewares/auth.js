/* eslint-disable object-shorthand */
const jwt = require('jsonwebtoken');
const StudentSchema = require('../models/student/studentSchema');
const AdminSchema = require('../models/admin/adminSchema');
const TeacherSchema = require('../models/teacher/teacherSchema');
const PostsSchema = require('../models/plataform/postsSchema');

const { SECRET } = process.env;

exports.checkAuthAndPermissionLevel = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Header error');
  }
  try {
    jwt.verify(token, SECRET, (error) => {
      if (error) {
        return res.status(403).send('unauthorized');
      }
      return token;
    });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });
    const findTeacher = await TeacherSchema.findOne({ token: token });

    if (findStudent !== null) {
      if (findStudent.id !== req.params.id) {
        return res.status(403).json({
          message: 'You cannot access this route',
          details: `You can only access routes from the user-id: ${findStudent.id}`,
        });
      }
    }

    if (findTeacher !== null) {
      if (findTeacher.id !== req.params.id) {
        return res.status(403).json({
          message: 'You cannot access this route',
          details: `You can only access routes from the user-id: ${findTeacher.id}`,
        });
      }
    }

    if (findAdmin !== null) {
      if (findAdmin.role !== 'admin') {
        return res.status(403).json({
          message: 'You cannot access this route',
          details: 'Review your admin permissions and try again.',
        });
      }
    }
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.checkAuthAndPermissionPreRegister = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Header error');
  }
  try {
    jwt.verify(token, SECRET, (error) => {
      if (error) {
        return res.status(403).send('unauthorized');
      }
      return token;
    });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });
    const findTeacher = await TeacherSchema.findOne({ token: token });

    if (findStudent !== null) {
      if (findStudent.preRegister.toString() !== req.params.id) {
        return res.status(403).json({
          message: 'You cannot access this route',
          details: `You can only update routes with the pre-register id: ${findStudent.preRegister}`,
        });
      }
      return next();
    }

    if (findTeacher !== null) {
      if (findTeacher.preRegister.toString() !== req.params.id) {
        return res.status(403).json({
          message: 'You cannot access this route',
          details: `You can only update routes with the pre-register id: ${findTeacher.preRegister}`,
        });
      }
    }

    if (findAdmin !== null) {
      if (findAdmin.role !== 'admin') {
        return res.status(403).json({
          message: 'You cannot access this route',
          details: 'Review your admin permissions and try again.',
        });
      }
    }
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.checkAuthAndAdminPermission = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Header error');
  }
  try {
    jwt.verify(token, SECRET, (error) => {
      if (error) {
        return res.status(403).send('unauthorized');
      }
      return token;
    });

    const findAdmin = await AdminSchema.findOne({ token: token });

    if (findAdmin !== null) {
      if (findAdmin.role !== 'admin') {
        return res.status(403).json({
          message: 'You cannot access this route',
          details: 'Review your admin permissions and try again.',
        });
      }
      return next();
    }

    return res.status(403).json({
      message: 'You cannot access this route',
      details: 'Only the admin can access this route',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.checkAuthAndPermissionPosts = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Header error');
  }

  try {
    jwt.verify(token, SECRET, (error) => {
      if (error) {
        return res.status(403).send('unauthorized');
      }
      return token;
    });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });
    const findTeacher = await TeacherSchema.findOne({ token: token });

    const postFound = await PostsSchema.findById(req.params.id);
    if (postFound === null) {
      return res.status(404).json({
        message: 'The post update have failed',
        details: `There isn't a post with the id: ${req.params.id}, in the database.`,
      });
    }

    if (postFound) {
      if (findStudent) {
        if (findStudent.id.toString() === postFound.userId.toString()) {
          return next();
        }
        return res.status(403).json({
          message: 'You cannot access this route',
          details: `Only author: ${postFound.author} can make changes in this post.`,
        });
      }
      if (findTeacher) {
        if (findTeacher.id.toString() === postFound.userId.toString()) {
          return next();
        }
        return res.status(403).json({
          message: 'You cannot access this route',
          details: `Only author: ${postFound.author} can make changes in this post.`,
        });
      }
      if (findAdmin) {
        if (findAdmin.role === 'admin') {
          if (req.body.body || req.body.attachments || req.body.likes || req.body.dislikes) {
            return res.status(403).json({
              message: 'You cannot access this route',
              details: 'Only the author can modify this post.',
            });
          }
          return next();
        }
      }
    }
    return res.status(403).json({
      message: 'You cannot access this route',
      details: 'You need to be logged in.',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.checkAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Header error');
  }
  try {
    jwt.verify(token, SECRET, (error) => {
      if (error) {
        return res.status(403).send('unauthorized');
      }
      return token;
    });

    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
