const express = require('express');

const router = express.Router();

const controller = require('../../controllers/student/studentController');
const { checkAuthAndPermissionLevel, checkAuth } = require('../../middlewares/auth');
const { validateEmailPasswordUsername, hashPassword } = require('../../helpers/validationHelpers');

router.post('/new-student/:id', validateEmailPasswordUsername, hashPassword, controller.createNewStudent);
router.get('/profile/home/:username', checkAuth, controller.findProfileByUsername);
router.put('/private-profile/update/:id', checkAuthAndPermissionLevel, validateEmailPasswordUsername, hashPassword, controller.updateStudent);
router.delete('/private-profile/delete/:id', checkAuthAndPermissionLevel, controller.deleteStudent);

module.exports = router;
