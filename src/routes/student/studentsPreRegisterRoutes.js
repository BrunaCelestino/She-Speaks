const express = require('express');

const router = express.Router();

const controller = require('../../controllers/student/studentsPreRegisterController');
const { validateCPF } = require('../../helpers/authentication');
const { checkAuthAndPermissionPreRegister, checkAuthAndAdminPermission } = require('../../middlewares/auth');

router.post('/new-pre-register', validateCPF, controller.createNewStudentPreRegister);
router.get('/pre-register/:id', controller.getPreRegisterById);
router.get('/all-pre-registers', checkAuthAndAdminPermission, controller.getAllPreRegisters);
router.put('/update-pre-register/:id', checkAuthAndPermissionPreRegister, validateCPF, controller.updatePreRegister);
router.delete('/delete-pre-register/:id', checkAuthAndAdminPermission, controller.deletePreRegister);

module.exports = router;
