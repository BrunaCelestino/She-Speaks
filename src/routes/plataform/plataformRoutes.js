const express = require('express');

const router = express.Router();

const controller = require('../../controllers/plataform/plataformController');
const { checkAuth } = require('../../middlewares/auth');

router.post('/admin/sign-in', controller.adminSignIn);
router.post('/student/sign-in', controller.studentSignIn);
router.post('/teacher/sign-in', controller.teacherSignIn);
router.get('/all-profiles', checkAuth, controller.getAllProfiles);
router.get('/feed', checkAuth, controller.getAllPosts);
router.get('/notifications', checkAuth, controller.getMyNotifications);

module.exports = router;
