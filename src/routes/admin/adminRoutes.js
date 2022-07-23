const express = require('express');

const router = express.Router();

const controller = require('../../controllers/admin/adminController');

const { validateEmailPasswordUsername, hashPassword } = require('../../helpers/validationHelpers');

router.post('/new', validateEmailPasswordUsername, hashPassword, controller.createNewAdmin);
router.put('/update/:id', validateEmailPasswordUsername, hashPassword, controller.updateAdmin);
router.delete('/delete/:id', controller.deleteAdmin);
router.get('/find-admin-by-email', controller.getOneAdminByEmail);
router.get('/find-all-admins', controller.getAllAdmins);
router.get('/find-admin/:id', controller.getOneAdminById);

module.exports = router;
