/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
const PostsSchema = require('../../models/platform/postsSchema');
const StudentSchema = require('../../models/student/studentSchema');
const TeacherSchema = require('../../models/teacher/teacherSchema');
const AdminSchema = require('../../models/admin/adminSchema');

const createPosts = async (req, res) => {
  const { body, attachments } = req.body;
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });

    let username;
    let userId;
    if (findTeacher === null && findStudent === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'Forbidden',
      });
    }
    if (findTeacher) {
      username = findTeacher.username;
      userId = findTeacher.id;
    }

    if (findStudent) {
      username = findStudent.username;
      userId = findStudent.id;
    }

    const newPost = new PostsSchema({
      userId: userId,
      author: username,
      body,
      attachments,
    });

    await newPost.save();

    const findNewPost = await PostsSchema.find(newPost).select(' -userId');

    return res.status(201).json({
      message: 'Post successfully created',
      findNewPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPostsById = async (req, res) => {
  try {
    const postFound = await PostsSchema.findById(req.params.id).select(
      '-userId',
    );

    if (postFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find this post',
        details: 'Not Found',
      });
    }

    postFound.clicks += 1;

    await postFound.save();

    return res.status(200).json({
      message: 'Post found!',
      postFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findMyPosts = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });

    if (findStudent) {
      const postFound = await PostsSchema.find({ userId: findStudent.id }).select('-userId');

      if (postFound.length === 0) {
        return res.status(404).json({
          message: 'It was not possible to find posts',
          details: 'Not Found',
        });
      }

      return res.status(200).json({
        message: 'Here are your posts!',
        postFound,
      });
    }
    if (findTeacher) {
      const postFound = await PostsSchema.find({ userId: findTeacher.id }).select('-userId');

      if (postFound.length === 0) {
        return res.status(404).json({
          message: 'It was not possible to find posts',
          details: 'Not Found',
        });
      }

      return res.status(200).json({
        message: 'Here are your posts!',
        postFound,
      });
    }

    return res.status(403).json({
      message: 'You cannot access this route',
      details: 'Forbidden',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { body, attachments } = req.body;
  try {
    const postFound = await PostsSchema.findById(req.params.id);

    postFound.body = body || postFound.body;
    postFound.attachments = attachments || postFound.attachments;

    await postFound.save();
    const findUpdate = await PostsSchema.findById(req.params.id).select(
      ' -userId',
    );

    return res.status(200).json({
      message: 'Post successfully updated!',
      findUpdate,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePosts = async (req, res) => {
  try {
    const postFound = await PostsSchema.findById(req.params.id);

    await postFound.delete();
    return res.status(200).json({
      message: 'Post successfully deleted',
      postFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const likeOrDislikePosts = async (req, res) => {
  const { likes, dislikes } = req.body;
  try {
    const postFound = await PostsSchema.findById(req.params.id).select(
      '-userId',
    );

    if (!postFound) {
      return res.status(404).json({
        message: 'Unable to complete the action.',
        details: 'Not Found',
      });
    }

    if (likes && dislikes) {
      return res.status(409).json({
        message: 'Unable to complete the action.',
        details:
          'This action only accepts one key at the time, choose -likes- or -dislikes-',
      });
    }

    if (likes === true) {
      postFound.likes += 1;
      postFound.clicks += 1;

      await postFound.save();

      return res.status(200).json({
        message: 'Post successfuly liked!.',
        postFound,
      });
    }
    if (dislikes === true) {
      postFound.dislikes += 1;
      postFound.clicks += 1;

      await postFound.save();

      return res.status(200).json({
        message: 'Post successfuly disliked!.',
        postFound,
      });
    }
    postFound.clicks += 1;
    await postFound.save();

    return res.status(409).json({
      message: 'Unable to complete the action.',
      details: 'This action only accepts -true- as a statement',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const saveFavoritePosts = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });

    const postFound = await PostsSchema.findById(req.params.id).select(
      '-userId',
    );
    if (!postFound) {
      return res.status(404).json({
        message: 'You could not add this post to your favorites',
        details: 'Not Found',
      });
    }
    if (findTeacher === null && findStudent === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'Forbidden',
      });
    }

    if (findTeacher) {
      const { favorites } = findTeacher;

      if (favorites.length > 0) {
        const checkIfPostIsFavorite = favorites.find(
          (post) => post._id.toString() === req.params.id.toString(),
        );

        if (checkIfPostIsFavorite) {
          return res.status(409).json({
            message: 'You cannot add this post to your favorites',
            details: 'Conflict',
          });
        }
      }

      findTeacher.favorites.push(postFound);
      postFound.clicks += 1;
      await postFound.save();
      await findTeacher.save();

      const findProfile = await TeacherSchema.find(findTeacher);
      return res.status(200).json({
        message: 'Post successfuly added to your favorites!.',
        findProfile,
      });
    }

    if (findStudent) {
      const { favorites } = findStudent;

      if (favorites.length > 0) {
        const checkIfPostIsFavorite = favorites.find(
          (post) => post._id.toString() === req.params.id.toString(),
        );

        if (checkIfPostIsFavorite) {
          return res.status(409).json({
            message: 'You could not add the post to your favorites.',
            details: 'Conflict',
          });
        }
      }

      findStudent.favorites.push(postFound);
      postFound.clicks += 1;
      await postFound.save();
      await findStudent.save();

      const findProfile = await StudentSchema.find(findStudent);
      return res.status(200).json({
        message: 'Post successfuly added to your favorites!.',
        findProfile,
      });
    }
    return res.status(500).json({
      message:
        'We could not add this post to your favorites. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeFavoritePosts = async (req, res) => {
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
      const { favorites } = findTeacher;

      const checkIfPostIsFavorite = favorites.findIndex(
        (post) => post._id.toString() === req.params.id.toString(),
      );

      if (checkIfPostIsFavorite === -1) {
        return res.status(404).json({
          message: 'You could not remove the post from your favorites.',
          details: 'Not Found',
        });
      }

      favorites.splice(checkIfPostIsFavorite, 1);
      await findTeacher.save();

      const findProfile = await TeacherSchema.find(findTeacher);
      return res.status(200).json({
        message: 'Post successfuly removed from your favorites!.',
        findProfile,
      });
    }

    if (findStudent) {
      const { favorites } = findStudent;

      const checkIfPostIsFavorite = favorites.findIndex(
        (post) => post._id.toString() === req.params.id.toString(),
      );
      if (checkIfPostIsFavorite === -1) {
        return res.status(404).json({
          message: 'You could not remove the post from your favorites.',
          details: 'Not Found',
        });
      }

      favorites.splice(checkIfPostIsFavorite, 1);
      await findStudent.save();

      const findProfile = await StudentSchema.find(findStudent);
      return res.status(200).json({
        message: 'Post successfuly removed from your favorites!.',
        findProfile,
      });
    }
    return res.status(500).json({
      message:
        'We could not remove this post from your favorites. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const commentPosts = async (req, res) => {
  const { replyBody } = req.body;
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });

    if (!findTeacher && !findStudent) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'Forbidden',
      });
    }

    let username;

    if (findTeacher !== null) {
      username = findTeacher.username;
    }

    if (findStudent !== null) {
      username = findStudent.username;
    }
    const newComment = {
      commentUsername: username,
      replyBody: replyBody,
    };

    const postFound = await PostsSchema.findById(req.params.id).select(
      '-userId',
    );

    if (postFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find this post',
        details: 'Not Found',
      });
    }

    postFound.comments.push(newComment);
    postFound.clicks += 1;

    await postFound.save();

    return res.status(200).json({
      message: `You commented on post: ${req.params.id}.`,
      postFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteCommentFromPosts = async (req, res) => {
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const findTeacher = await TeacherSchema.findOne({ token: token });
    const findStudent = await StudentSchema.findOne({ token: token });
    const findAdmin = await AdminSchema.findOne({ token: token });

    if (!findTeacher && !findStudent && !findAdmin) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'Forbidden',
      });
    }
    const postFound = await PostsSchema.findById(req.params.id).select(
      '-userId',
    );
    if (postFound === null) {
      return res.status(404).json({
        message: 'Fail to delete the comment',
        details: 'Post Not Found',
      });
    }
    const { comments } = postFound;
    if (comments.length === 0) {
      return res.status(404).json({
        message: 'Fail to delete the comment',
        details: 'Comment not found',
      });
    }
    const checkCommentId = comments.find(
      (comment) => comment._id.toString() === req.params.commentId.toString(),
    );

    if (checkCommentId === undefined) {
      return res.status(404).json({
        message: 'Fail to delete the comment',
        details: 'Comment not found',
      });
    }
    if (findTeacher) {
      if (
        findTeacher.username === checkCommentId.commentUsername
        || findTeacher.username === postFound.author
      ) {
        const index = comments.indexOf(checkCommentId);
        comments.splice(index, 1);

        postFound.clicks += 1;
        await postFound.save();

        return res.status(200).json({
          message: 'Comment successfully deleted',
          checkCommentId,
        });
      }
    }
    if (findStudent) {
      if (
        findStudent.username === checkCommentId.commentUsername
        || findStudent.username === postFound.author
      ) {
        const index = comments.indexOf(checkCommentId);
        comments.splice(index, 1);
        postFound.clicks += 1;

        await postFound.save();

        return res.status(200).json({
          message: 'Comment successfully deleted',
          checkCommentId,
        });
      }
    }

    if (findAdmin) {
      if (findAdmin.role === 'admin') {
        const index = comments.indexOf(checkCommentId);
        comments.splice(index, 1);

        await postFound.save();

        return res.status(200).json({
          message: 'Comment successfully deleted',
          checkCommentId,
        });
      }
    }
    return res.status(500).json({
      message: 'We could not delete the comment. Please try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCommentFromPosts = async (req, res) => {
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
    const postFound = await PostsSchema.findById(req.params.id).select(
      '-userId',
    );
    if (postFound === null) {
      return res.status(404).json({
        message: 'Fail to update the comment',
        details: 'Post Not Found',
      });
    }
    const { comments } = postFound;

    if (comments.length > 0) {
      const checkCommentId = comments.find(
        (comment) => comment._id.toString() === req.params.commentId.toString(),
      );
      if (checkCommentId === undefined) {
        return res.status(404).json({
          message: 'Fail to update the comment',
          details: 'Comment Not Found',
        });
      }
      if (findTeacher) {
        if (findTeacher.username === checkCommentId.commentUsername) {
          const index = comments.indexOf(checkCommentId);
          const updatedComment = {
            commentUsername: findTeacher.username,
            replyBody: req.body.replyBody,
            _id: req.params.commentId,
          };
          comments.splice(index, 1, updatedComment);

          postFound.clicks += 1;
          await postFound.save();

          return res.status(200).json({
            message: 'Comment successfully updated',
            updatedComment,
          });
        }
      }
      if (findStudent) {
        if (findStudent.username === checkCommentId.commentUsername) {
          const updatedComment = {
            commentUsername: findStudent.username,
            replyBody: req.body.replyBody,
            _id: req.params.commentId,
          };
          const index = comments.indexOf(checkCommentId);
          comments.splice(index, 1, updatedComment);
          postFound.clicks += 1;

          await postFound.save();
          return res.status(200).json({
            message: 'Comment successfully updated',
            updatedComment,
          });
        }
      }
    }

    return res.status(500).json({
      message: 'We could not update the comment. Please, try again later',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const findAllPosts = await PostsSchema.find({})
      .sort({ updatedAt: 'asc' })
      .select('-userId');
    return res.status(200).json({
      message: 'Here is your feed:',
      findAllPosts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPosts,
  getPostsById,
  findMyPosts,
  updatePost,
  deletePosts,
  likeOrDislikePosts,
  saveFavoritePosts,
  removeFavoritePosts,
  commentPosts,
  deleteCommentFromPosts,
  updateCommentFromPosts,
  getAllPosts,
};
