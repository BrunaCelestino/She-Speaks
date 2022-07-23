const express = require('express');

const router = express.Router();

const controller = require('../../controllers/platform/friendsListController');

const { checkAuth } = require('../../middlewares/auth');

router.post('/friends-list/request/:id', checkAuth, controller.sendFriendRequest);
router.patch('/friends-list/update/:id', checkAuth, controller.updateFriendRequest);
router.delete('/friends-list/delete/:id', checkAuth, controller.deleteFriend);
router.get('/friends-list', checkAuth, controller.getFriendsList);

module.exports = router;
