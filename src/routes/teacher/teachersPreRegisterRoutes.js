const express = require('express');

const router = express.Router();

const controller = require('../../controllers/teacher/teachersPreRegisterController');
const { validateCPF } = require('../../helpers/validationHelpers');
const { checkAuthAndPermissionPreRegister, checkAuthAndAdminPermission } = require('../../middlewares/auth');

router.post('/new-pre-register', validateCPF, controller.createNewTeacherPreRegister);
router.get('/pre-register/:id', controller.getPreRegisterById);
router.get('/all-pre-registers', checkAuthAndAdminPermission, controller.getAllPreRegisters);
router.put('/update-pre-register/:id', checkAuthAndPermissionPreRegister, validateCPF, controller.updatePreRegister);
router.delete('/delete-pre-register/:id', checkAuthAndAdminPermission, controller.deletePreRegister);

module.exports = router;
