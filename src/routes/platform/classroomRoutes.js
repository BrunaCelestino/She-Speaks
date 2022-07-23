const express = require('express');

const router = express.Router();

const controller = require('../../controllers/platform/classroomController');

const { checkAuth } = require('../../middlewares/auth');

router.post('/classroom/new', checkAuth, controller.createClassroom);
router.put('/classroom/update/:id', checkAuth, controller.updateClassroom);
router.delete('/classroom/delete/:id', checkAuth, controller.deleteClassroom);
router.patch('/classroom/enroll/:id', checkAuth, controller.enrollInAClassroom);
router.delete('/classroom/leave/:id', checkAuth, controller.leaveAClassroom);
router.get('/classroom/all', checkAuth, controller.getAllClassrooms);
router.get('/classroom/filter', checkAuth, controller.findClassroomByFilters);
router.get('/classroom/match', checkAuth, controller.findAClassroomMatch);
router.get('/classroom/:id', checkAuth, controller.findClassroomById);

module.exports = router;
