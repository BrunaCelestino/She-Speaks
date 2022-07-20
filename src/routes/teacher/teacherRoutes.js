const express = require('express');

const router = express.Router();

const controller = require('../../controllers/teacher/teacherController');

const { checkAuthAndPermissionLevel, checkAuth } = require('../../middlewares/auth');
const { validateEmailPasswordUsername, hashPassword } = require('../../helpers/authentication');

router.post('/new-teacher/:id', validateEmailPasswordUsername, hashPassword, controller.createNewTeacher);
router.get('/profile/home/:username', checkAuth, controller.findProfileByUsername);
router.put('/profile/update/:id', checkAuthAndPermissionLevel, validateEmailPasswordUsername, hashPassword, controller.updateTeacher);
router.delete('/profile/delete/:id', checkAuthAndPermissionLevel, controller.deleteTeacher);

module.exports = router;
