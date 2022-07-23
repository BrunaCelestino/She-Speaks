/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
const StudentSchema = require('../../models/student/studentSchema');
const TeacherSchema = require('../../models/teacher/teacherSchema');
const NotificationSchema = require('../../models/platform/notificationSchema');

const sendFriendRequest = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'Forbidden.',
      });
    }
    const findTeacherToAdd = await TeacherSchema.findById(req.params.id);
    const findStudentToAdd = await StudentSchema.findById(req.params.id);

    if (findTeacherToAdd === null && findStudentToAdd === null) {
      return res.status(404).json({
        message: 'It was not possible to find this user.',
        details: 'Not found',
      });
    }

    if (findStudent) {
      const { friendsList } = findStudent;

      if (findTeacherToAdd) {
        if (friendsList.length !== 0) {
          const findIfAlreadyFriends = friendsList.find(
            (friends) => friends.username === findTeacherToAdd.username,
          );
          if (findIfAlreadyFriends) {
            return res.status(409).json({
              message: 'You cannot add this user to your friends',
              details: 'Conflict',
            });
          }
        }

        const newNotification = new NotificationSchema({
          requester: findStudent.username,
          requested: findTeacherToAdd.username,
          requestType: 'friendRequest',
          description: `${findStudent.username} sent you a friend request!`,
        });

        await newNotification.save();
        return res.status(201).json({
          message: 'Friend request successfuly sent!.',
          newNotification,
        });
      }
      if (findStudentToAdd) {
        if (friendsList.length !== 0) {
          const findIfAlreadyFriends = friendsList.find(
            (friends) => friends.username === findStudentToAdd.username,
          );

          if (findIfAlreadyFriends) {
            return res.status(409).json({
              message: 'You cannot add this user to your friends',
              details: 'Conflict',
            });
          }
        }
        if (findStudent.id === findStudentToAdd.id) {
          return res.status(409).json({
            message: 'Conflict',
          });
        }
        const newNotification = new NotificationSchema({
          requester: findStudent.username,
          requested: findStudentToAdd.username,
          requestType: 'friendRequest',
          description: `${findStudent.username} sent you a friend request!`,
        });
        await newNotification.save();
        return res.status(201).json({
          message: 'Friend request successfuly sent!.',
          newNotification,
        });
      }
    }

    if (findTeacher) {
      const { friendsList } = findTeacher;
      if (findTeacherToAdd) {
        if (friendsList.length !== 0) {
          const findIfAlreadyFriends = friendsList.find(
            (friends) => friends.username === findTeacherToAdd.username,
          );
          if (findIfAlreadyFriends) {
            return res.status(409).json({
              message: 'You cannot add this user to your friends',
              details: 'Conflict',
            });
          }
        }
        if (findTeacher.id === findTeacherToAdd.id) {
          return res.status(409).json({
            message: 'Conflict',
          });
        }
        const newNotification = new NotificationSchema({
          requester: findTeacher.username,
          requested: findTeacherToAdd.username,
          requestType: 'friendRequest',
          description: `${findTeacher.username} sent you a friend request!`,
        });
        await newNotification.save();
        return res.status(201).json({
          message: 'Friend request successfuly sent!.',
          newNotification,
        });
      }
      if (findStudentToAdd) {
        if (friendsList.length !== 0) {
          const findIfAlreadyFriends = friendsList.find(
            (friends) => friends.username === findStudentToAdd.username,
          );
          if (findIfAlreadyFriends) {
            return res.status(409).json({
              message: 'You cannot add this user to your friends',
              details: 'Conflict',
            });
          }
        }
        const newNotification = new NotificationSchema({
          requester: findTeacher.username,
          requested: findStudentToAdd.username,
          requestType: 'friendRequest',
          description: `${findTeacher.username} requested to add you as a friend!`,
        });
        await newNotification.save();
        return res.status(201).json({
          message: 'Friend request successfuly sent!.',
          newNotification,
        });
      }
    }

    return res.status(500).json({
      message: 'We could not send your friend request. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateFriendRequest = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'Forbidden.',
      });
    }

    if (findStudent) {
      const { friendsList } = findStudent;

      const findNotifications = await NotificationSchema.findById(
        req.params.id,
      );
      if (!findNotifications) {
        return res.status(404).json({
          message: 'It was not possible to find this notification.',
          details: 'Not found.',
        });
      }
      if (findNotifications.requestStatus !== 'sent') {
        return res.status(409).json({
          message: 'Friend request already updated!',
          findNotifications,
        });
      }
      const findTeacherToAdd = await TeacherSchema.findOne({
        username: findNotifications.requester,
      });
      const findStudentToAdd = await StudentSchema.findOne({
        username: findNotifications.requester,
      });
      if (findTeacherToAdd) {
        if (friendsList.length > 0) {
          const findIfAlreadyFriends = friendsList.find(
            (friends) => friends.username === findTeacherToAdd.username,
          );
          if (findIfAlreadyFriends) {
            return res.status(409).json({
              message: 'You cannot add this user to your friends',
              details: 'Conflict',
            });
          }
        }
        if (req.body.requestStatus === 'denied') {
          findNotifications.requestStatus = 'denied';
          await findNotifications.save();
          return res.status(200).json({
            message: 'Friend request successfuly refused!.',
            findNotifications,
          });
        }
        if (req.body.requestStatus === 'accepted') {
          findNotifications.requestStatus = 'accepted';
          await findNotifications.save();
          friendsList.push({
            _id: findTeacherToAdd._id,
            username: findTeacherToAdd.username,
            role: findTeacherToAdd.role,
          });
          await findStudent.save();

          findTeacherToAdd.friendsList.push({
            _id: findStudent._id,
            username: findStudent.username,
            role: findStudent.role,
          });

          await findTeacherToAdd.save();

          return res.status(200).json({
            message: 'User successfuly added to your friends list!.',
            findStudent,
          });
        }
      }

      if (findStudentToAdd) {
        if (friendsList.length > 0) {
          const findIfAlreadyFriends = friendsList.find(
            (friends) => friends.username === findStudentToAdd.username,
          );
          if (findIfAlreadyFriends) {
            return res.status(409).json({
              message: 'You cannot add this user to your friends',
              details: 'Conflict',
            });
          }
          if (findStudent.id === findStudentToAdd.id) {
            return res.status(409).json({
              message: 'Conflict',
            });
          }
        }

        if (req.body.requestStatus === 'denied') {
          findNotifications.requestStatus = 'denied';
          await findNotifications.save();
          return res.status(200).json({
            message: 'Friend request successfuly refused!.',
            findNotifications,
          });
        }
        if (req.body.requestStatus === 'accepted') {
          findNotifications.requestStatus = 'accepted';
        }

        await findNotifications.save();
        friendsList.push({
          _id: findStudentToAdd._id,
          username: findStudentToAdd.username,
          role: findStudentToAdd.role,
        });
        await findStudent.save();

        findStudentToAdd.friendsList.push({
          _id: findStudent._id,
          username: findStudent.username,
          role: findStudent.role,
        });

        await findStudentToAdd.save();

        return res.status(200).json({
          message: 'User successfuly added to your friends list!.',
          findStudent,
        });
      }
    }

    if (findTeacher) {
      const { friendsList } = findTeacher;

      const findNotifications = await NotificationSchema.findById(
        req.params.id,
      );
      if (!findNotifications) {
        return res.status(404).json({
          message: 'It was not possible to find this notification.',
          details: 'Not Found',
        });
      }
      if (findNotifications.requestStatus !== 'sent') {
        return res.status(409).json({
          message: 'Friend request already updated!',
          findNotifications,
        });
      }
      const findTeacherToAdd = await TeacherSchema.findOne({
        username: findNotifications.requester,
      });
      const findStudentToAdd = await StudentSchema.findOne({
        username: findNotifications.requester,
      });

      if (findTeacherToAdd) {
        if (friendsList.length > 0) {
          const findIfAlreadyFriends = friendsList.find(
            (friends) => friends.username === findTeacherToAdd.username,
          );
          if (findIfAlreadyFriends) {
            return res.status(409).json({
              message: 'You cannot add this user to your friends',
              details: 'Conflict',
            });
          }
          if (findTeacher.id === findTeacherToAdd.id) {
            return res.status(409).json({
              message: 'Conflict',
            });
          }
        }
        if (req.body.requestStatus === 'denied') {
          findNotifications.requestStatus = 'denied';
          await findNotifications.save();
          return res.status(200).json({
            message: 'Friend request successfuly refused!.',
            findNotifications,
          });
        }
        if (req.body.requestStatus === 'accepted') {
          findNotifications.requestStatus = 'accepted';

          await findNotifications.save();
          friendsList.push({
            _id: findTeacherToAdd._id,
            username: findTeacherToAdd.username,
            role: findTeacherToAdd.role,
          });
          await findTeacher.save();

          findTeacherToAdd.friendsList.push({
            _id: findTeacher._id,
            username: findTeacher.username,
            role: findTeacher.role,
          });

          await findTeacherToAdd.save();

          return res.status(200).json({
            message: 'User successfuly added to your friends list!.',
            findTeacher,
          });
        }
      }
      if (findStudentToAdd) {
        if (friendsList.length > 0) {
          const findIfAlreadyFriends = friendsList.find(
            (friends) => friends.username === findStudentToAdd.username,
          );
          if (findIfAlreadyFriends) {
            return res.status(409).json({
              message: 'You cannot add this user to your friends',
              details: 'Conflict',
            });
          }
        }
        if (req.body.requestStatus === 'denied') {
          findNotifications.requestStatus = 'denied';
          await findNotifications.save();
          return res.status(200).json({
            message: 'Friend request successfuly refused!.',
            findTeacher,
          });
        }
        if (req.body.requestStatus === 'accepted') {
          findNotifications.requestStatus = 'accepted';

          await findNotifications.save();
          friendsList.push({
            _id: findStudentToAdd._id,
            username: findStudentToAdd.username,
            role: findStudentToAdd.role,
          });
          await findTeacher.save();

          findStudentToAdd.friendsList.push({
            _id: findTeacher._id,
            username: findTeacher.username,
            role: findTeacher.role,
          });

          await findStudentToAdd.save();

          return res.status(200).json({
            message: 'User successfuly added to your friends list!.',
            findTeacher,
          });
        }
      }
    }
    return res.status(500).json({
      message: 'We could not process your update. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'Forbidden',
      });
    }
    if (findTeacher) {
      const { friendsList } = findTeacher;
      const checkIfAreFriends = friendsList.find(
        (friend) => friend._id.toString() === req.params.id.toString(),
      );
      if (checkIfAreFriends === undefined) {
        return res.status(404).json({
          message: 'You could not remove this user from your friends list.',
          details: 'Not Found',
        });
      }

      const index = friendsList.indexOf(checkIfAreFriends);
      friendsList.splice(index, 1);
      await findTeacher.save();

      if (checkIfAreFriends) {
        const friendsTeacher = await TeacherSchema.find({
          username: checkIfAreFriends.username,
        });

        if (friendsTeacher.length > 0) {
          const friendsTeacher = await TeacherSchema.findOne({
            username: checkIfAreFriends.username,
          });

          const { friendsList } = friendsTeacher;

          const findFriendTeacher = friendsList.find(
            (friends) => friends.username === findTeacher.username,
          );
          if (findFriendTeacher) {
            const indexTeacher = friendsList.indexOf(findFriendTeacher);
            friendsList.splice(indexTeacher, 1);
            await friendsTeacher.save();
          }
        }

        if (friendsTeacher.length === 0) {
          const friendsStudent = await StudentSchema.findOne({
            username: checkIfAreFriends.username,
          });

          const { friendsList } = friendsStudent;

          const findFriendStudent = friendsList.find(
            (friends) => friends.username === findTeacher.username,
          );
          if (findFriendStudent) {
            const indexStudent = friendsList.indexOf(findFriendStudent);
            friendsList.splice(indexStudent, 1);
            await friendsStudent.save();
          }
        }

        const findProfile = await TeacherSchema.find(findTeacher);
        return res.status(200).json({
          message: 'Friend successfuly removed from your friends List!.',
          findProfile,
        });
      }
    }
    if (findStudent) {
      const { friendsList } = findStudent;
      const checkIfAreFriends = friendsList.find(
        (friend) => friend._id.toString() === req.params.id.toString(),
      );
      if (checkIfAreFriends === undefined) {
        return res.status(404).json({
          message: 'You could not remove this user from your friends list.',
          details: 'Not Found',
        });
      }

      const index = friendsList.indexOf(checkIfAreFriends);
      friendsList.splice(index, 1);
      await findStudent.save();

      if (checkIfAreFriends) {
        const friendsTeacher = await TeacherSchema.find({
          username: checkIfAreFriends.username,
        });

        if (friendsTeacher.length > 0) {
          const friendsTeacher = await TeacherSchema.findOne({
            username: checkIfAreFriends.username,
          });

          const { friendsList } = friendsTeacher;

          const findFriendTeacher = friendsList.find(
            (friends) => friends.username === findStudent.username,
          );
          if (findFriendTeacher) {
            const indexTeacher = friendsList.indexOf(findFriendTeacher);
            friendsList.splice(indexTeacher, 1);
            await friendsTeacher.save();
          }
        }

        if (friendsTeacher.length === 0) {
          const friendsStudent = await StudentSchema.findOne({
            username: checkIfAreFriends.username,
          });

          const { friendsList } = friendsStudent;

          const findFriendStudent = friendsList.find(
            (friends) => friends.username === findStudent.username,
          );
          if (findFriendStudent) {
            const indexStudent = friendsList.indexOf(findFriendStudent);
            friendsList.splice(indexStudent, 1);
            await friendsStudent.save();
          }
        }

        const findProfile = await StudentSchema.find(findStudent);
        return res.status(200).json({
          message: 'Friend successfuly removed from your friends List!.',
          findProfile,
        });
      }
    }

    return res.status(500).json({
      message:
        'We could not remove this user from your friends list. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFriendsList = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });

    if (findTeacher === null && findStudent === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'Forbidden',
      });
    }
    if (findTeacher) {
      const list = findTeacher.friendsList;
      return res.status(200).json({
        message: 'Here is your friends List:.',
        details: `You have - ${list.length} friends.`,
        list,
      });
    }
    if (findStudent) {
      const list = findStudent.friendsList;
      return res.status(200).json({
        message: 'Here is your friends List:.',
        details: `You have - ${list.length} - friends.`,
        list,
      });
    }

    return res.status(500).json({
      message: 'We could not load your friends list. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  sendFriendRequest,
  updateFriendRequest,
  deleteFriend,
  getFriendsList,
};
