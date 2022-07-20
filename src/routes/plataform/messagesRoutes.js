const express = require('express');

const router = express.Router();

const controller = require('../../controllers/plataform/messagesController');

const { checkAuth } = require('../../middlewares/auth');

router.post('/message/send', checkAuth, controller.createMessages);
router.delete('/message/my-messages/delete/:id', checkAuth, controller.deleteMessageById);
router.get('/message/my-messages/all', checkAuth, controller.findAllMessages);
router.get('/message/my-messages/sent', checkAuth, controller.findAllSentMessages);
router.get('/message/my-messages/received', checkAuth, controller.findAllReceivedMessages);
router.get('/message/my-messages/received/unread', checkAuth, controller.findAllUnreadMessages);
router.get('/message/my-messages/received/read', checkAuth, controller.findAllReadMessages);
router.get('/message/my-messages/:id', checkAuth, controller.findMessageById);

module.exports = router;
