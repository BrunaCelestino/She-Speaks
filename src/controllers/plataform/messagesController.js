/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
const MessagesSchema = require('../../models/plataform/messagesSchema');
const StudentSchema = require('../../models/student/studentSchema');
const TeacherSchema = require('../../models/teacher/teacherSchema');
const AdminSchema = require('../../models/admin/adminSchema');
const NotificationSchema = require('../../models/plataform/notificationSchema');

const createMessages = async (req, res) => {
  const { body, attachments, to } = req.body;
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });
    let sender;
    let role;
    let mailbox;

    const teacherReceiver = await TeacherSchema.findOne({ username: to });
    const studentReceiver = await StudentSchema.findOne({ username: to });
    const adminReceiver = await AdminSchema.findOne({ email: to });

    if (findTeacher === null && findStudent === null && findAdmin === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'You need to be logged in to post',
      });
    }
    if (findTeacher) {
      sender = findTeacher.username;
      role = findTeacher.role;
      mailbox = findTeacher.messages;
    }

    if (findStudent) {
      sender = findStudent.username;
      role = findStudent.role;
      mailbox = findStudent.messages;
    }

    if (findAdmin) {
      sender = findAdmin.email;
      role = findAdmin.role;
      mailbox = findAdmin.messages;
    }

    const newMessage = new MessagesSchema({
      from: sender,
      to,
      role,
      body,
      attachments,
    });

    await newMessage.save();
    mailbox.push(newMessage);

    if (findTeacher) await findTeacher.save();
    if (findStudent) await findStudent.save();
    if (findAdmin) await findAdmin.save();

    if (teacherReceiver) {
      teacherReceiver.messages.push(newMessage);
      await teacherReceiver.save();
    }

    if (studentReceiver) {
      studentReceiver.messages.push(newMessage);
      await studentReceiver.save();
    }

    if (adminReceiver) {
      adminReceiver.messages.push(newMessage);
      await adminReceiver.save();
    }
    const newNotification = new NotificationSchema({
      requester: sender,
      requested: to,
      requestType: 'message',
      description: `${sender} sent you a message!`,
    });
    await newNotification.save();

    const findNewMessage = await MessagesSchema.find(newMessage);

    return res.status(201).json({
      message: 'Message successfully sent!',
      findNewMessage,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllMessages = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null && findAdmin === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'You need to be logged in to post',
      });
    }

    if (findTeacher) {
      const findMessage = await TeacherSchema.find({
        $or: [
          { 'messages.from': findTeacher.username },
          { 'messages.to': findTeacher.username },
        ],
      }).select({ messages: 1, _id: 0 });

      return res.status(200).json({
        message: 'Here are all your sent and received messages:',
        findMessage,
      });
    }

    if (findStudent) {
      const findMessage = await StudentSchema.find({
        $or: [
          { 'messages.from': findStudent.username },
          { 'messages.to': findStudent.username },
        ],
      }).select({ messages: 1, _id: 0 });

      return res.status(200).json({
        message: 'Here are all your sent and received messages:',
        findMessage,
      });
    }
    if (findAdmin) {
      const findMessage = await AdminSchema.find({
        $or: [
          { 'messages.from': findAdmin.email },
          { 'messages.to': findAdmin.email },
        ],
      }).select({ messages: 1, _id: 0 });

      return res.status(200).json({
        message: 'Here are all your sent and received messages:',
        findMessage,
      });
    }

    return res.status(500).json({
      message: 'We could not get your messages. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllSentMessages = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null && findAdmin === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'You need to be logged in to post',
      });
    }
    if (findTeacher) {
      const { messages } = findTeacher;

      const findMessage = messages.find(
        (message) => message.from === findTeacher.username,
      );
      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no sent messages!',
        });
      }
      return res.status(200).json({
        message: 'Here are all the messages you sent:',
        findMessage,
      });
    }

    if (findStudent) {
      const { messages } = findStudent;

      const findMessage = messages.find(
        (message) => message.from === findStudent.username,
      );
      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no sent messages!',
        });
      }
      return res.status(200).json({
        message: 'Here are all the messages you sent:',
        findMessage,
      });
    }
    if (findAdmin) {
      const { messages } = findAdmin;
      const findMessage = messages.find(
        (message) => message.from === findAdmin.email,
      );
      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no sent messages!',
        });
      }
      return res.status(200).json({
        message: 'Here are all the messages you sent:',
        findMessage,
      });
    }

    return res.status(500).json({
      message: 'We could not get your messages. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllReceivedMessages = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null && findAdmin === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'You need to be logged in to post',
      });
    }

    if (findTeacher) {
      const { messages } = findTeacher;

      const findMessage = messages.find(
        (message) => message.to === findTeacher.username,
      );
      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no received messages!',
        });
      }
      return res.status(200).json({
        message: 'Here are all the messages you received:',
        findMessage,
      });
    }

    if (findStudent) {
      const { messages } = findStudent;

      const findMessage = messages.find(
        (message) => message.to === findStudent.username,
      );
      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no received messages!',
        });
      }
      return res.status(200).json({
        message: 'Here are all the messages you received:',
        findMessage,
      });
    }

    if (findAdmin) {
      const { messages } = findAdmin;

      const findMessage = messages.find(
        (message) => message.to === findAdmin.email,
      );
      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no received messages!',
        });
      }
      return res.status(200).json({
        message: 'Here are all the messages you received:',
        findMessage,
      });
    }

    return res.status(500).json({
      message: 'We could not get your messages. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllUnreadMessages = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null && findAdmin === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'You need to be logged in to post',
      });
    }
    if (findTeacher) {
      const { messages } = findTeacher;

      const findMessage = messages.find(
        (message) => message.read === false && message.to === findTeacher.username,
      );
      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no unread messages!',
        });
      }
      return res.status(200).json({
        message: 'Here are all your unread messages:',
        findMessage,
      });
    }

    if (findStudent) {
      const { messages } = findStudent;

      const findMessage = messages.find(
        (message) => message.read === false && message.to === findStudent.username,
      );

      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no unread messages!',
        });
      }

      return res.status(200).json({
        message: 'Here are all your unread messages:',
        findMessage,
      });
    }
    if (findAdmin) {
      const { messages } = findAdmin;

      const findMessage = messages.find(
        (message) => message.read === false && message.to === findAdmin.username,
      );

      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no unread messages!',
        });
      }

      return res.status(200).json({
        message: 'Here are all your unread messages:',
        findMessage,
      });
    }

    return res.status(500).json({
      message: 'We could not get your messages. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllReadMessages = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null && findAdmin === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'You need to be logged in to post',
      });
    }
    if (findTeacher) {
      const { messages } = findTeacher;

      const findMessage = messages.find(
        (message) => message.read === true && message.to === findTeacher.username,
      );
      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no read messages!',
        });
      }
      return res.status(200).json({
        message: 'Here are all your read messages:',
        findMessage,
      });
    }

    if (findStudent) {
      const { messages } = findStudent;

      const findMessage = messages.find(
        (message) => message.read === true && message.to === findStudent.username,
      );

      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no read messages!',
        });
      }
      return res.status(200).json({
        message: 'Here are all your read messages:',
        findMessage,
      });
    }
    if (findAdmin) {
      const { messages } = findAdmin;

      const findMessage = messages.find(
        (message) => message.read === true && message.to === findAdmin.username,
      );
      if (!findMessage) {
        return res.status(200).json({
          message: 'You have no read messages!',
        });
      }
      return res.status(200).json({
        message: 'Here are all your read messages:',
        findMessage,
      });
    }

    return res.status(500).json({
      message: 'We could not get your messages. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findMessageById = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null && findAdmin === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'You need to be logged in to post',
      });
    }
    if (findTeacher) {
      const { messages } = findTeacher;

      const findMessage = messages.find(
        (message) => message._id.toString() === req.params.id.toString(),
      );
      if (!findMessage) {
        return res.status(404).json({
          message: `Message: ${req.params.id} not found.`,
          details: `There isn't a message id: ${req.params.id} in the database.`,
        });
      }
      if (findMessage.to === findTeacher.username) {
        findMessage.read = true;
        const index = messages.indexOf(findMessage);
        messages.splice(index, 1, findMessage);
        await findTeacher.save();

        return res.status(200).json({
          message: `Message: ${req.params.id} from: ${findMessage.from}`,
          findMessage,
        });
      }
      return res.status(404).json({
        message: `Message: ${req.params.id} not found.`,
        details: `There isn't a message id: ${req.params.id}, sent to: ${findTeacher.username} in the database.`,
      });
    }

    if (findStudent) {
      const { messages } = findStudent;

      const findMessage = messages.find(
        (message) => message._id.toString() === req.params.id.toString(),
      );
      if (!findMessage) {
        return res.status(404).json({
          message: `Message: ${req.params.id} not found.`,
          details: `There isn't a message id: ${req.params.id} in the database.`,
        });
      }
      if (findMessage.to === findStudent.username) {
        findMessage.read = true;
        const index = messages.indexOf(findMessage);
        messages.splice(index, 1, findMessage);
        await findStudent.save();

        return res.status(200).json({
          message: `Message: ${req.params.id} from: ${findMessage.from}`,
          findMessage,
        });
      }
      return res.status(404).json({
        message: `Message: ${req.params.id} not found.`,
        details: `There isn't a message id: ${req.params.id}, sent to: ${findStudent.username} in the database.`,
      });
    }
    if (findAdmin) {
      const { messages } = findAdmin;

      const findMessage = messages.find(
        (message) => message._id.toString() === req.params.id.toString(),
      );
      if (!findMessage) {
        return res.status(404).json({
          message: `Message: ${req.params.id} not found.`,
          details: `There isn't a message id: ${req.params.id} in the database.`,
        });
      }
      if (findMessage.to === findAdmin.email) {
        findMessage.read = true;
        const index = messages.indexOf(findMessage);
        messages.splice(index, 1, findMessage);
        await findAdmin.save();

        return res.status(200).json({
          message: `Message: ${req.params.id} from: ${findMessage.from}`,
          findMessage,
        });
      }
      return res.status(404).json({
        message: `Message: ${req.params.id} not found.`,
        details: `There isn't a message id: ${req.params.id}, sent to: ${findAdmin.email} in the database.`,
      });
    }
    return res.status(500).json({
      message: 'We could not get your messages. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMessageById = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null && findAdmin === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'You need to be logged in to post',
      });
    }
    if (findTeacher) {
      const { messages } = findTeacher;

      const findMessage = messages.find(
        (message) => message._id.toString() === req.params.id.toString(),
      );
      if (!findMessage) {
        return res.status(404).json({
          message: `Message: ${req.params.id} not found.`,
          details: `There isn't a message id: ${req.params.id} in the database.`,
        });
      }
      if (
        findMessage.to === findTeacher.username || findMessage.from === findTeacher.username
      ) {
        const index = messages.indexOf(findMessage);
        messages.splice(index, 1);
        await findTeacher.save();

        return res.status(200).json({
          message: `Message: ${req.params.id} from: ${findMessage.from}, deleted!`,
          findMessage,
        });
      }
    }

    if (findStudent) {
      const { messages } = findStudent;

      const findMessage = messages.find(
        (message) => message._id.toString() === req.params.id.toString(),
      );
      if (!findMessage) {
        return res.status(404).json({
          message: `Message: ${req.params.id} not found.`,
          details: `There isn't a message id: ${req.params.id} in the database.`,
        });
      }
      if (
        findMessage.to === findStudent.username || findMessage.from === findStudent.username
      ) {
        const index = messages.indexOf(findMessage);
        messages.splice(index, 1);
        await findStudent.save();

        return res.status(200).json({
          message: `Message: ${req.params.id} from: ${findMessage.from}, deleted!`,
          findMessage,
        });
      }
    }
    if (findAdmin) {
      const { messages } = findAdmin;

      const findMessage = messages.find(
        (message) => message._id.toString() === req.params.id.toString(),
      );
      if (!findMessage) {
        return res.status(404).json({
          message: `Message: ${req.params.id} not found.`,
          details: `There isn't a message id: ${req.params.id} in the database.`,
        });
      }
      if (
        findMessage.to === findAdmin.email || findMessage.from === findAdmin.email
      ) {
        const index = messages.indexOf(findMessage);
        messages.splice(index, 1);
        await findAdmin.save();

        return res.status(200).json({
          message: `Message: ${req.params.id} from: ${findMessage.from}, deleted!`,
          findMessage,
        });
      }
    }

    return res.status(500).json({
      message: 'We could not delete the message. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMessages,
  findAllMessages,
  findAllSentMessages,
  findAllReceivedMessages,
  findAllUnreadMessages,
  findAllReadMessages,
  findMessageById,
  deleteMessageById,
};
