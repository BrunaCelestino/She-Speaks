/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
const PostsSchema = require('../../models/plataform/postsSchema');
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
        details: 'You need to be logged in to post',
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
        details: `There isn't a post with the id: ${req.params.id}, in the database.`,
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

      if (!postFound) {
        return res.status(404).json({
          message: 'It was not possible to find posts',
          details: `There is not posts related to the user: ${findStudent.username}, in the database.`,
        });
      }

      return res.status(200).json({
        message: 'Here are your posts!',
        postFound,
      });
    }
    if (findTeacher) {
      const postFound = await PostsSchema.find({ userId: findTeacher.id }).select('-userId');

      if (!postFound) {
        return res.status(404).json({
          message: 'It was not possible to find posts',
          details: `There is not posts related to the user: ${findTeacher.username}, in the database.`,
        });
      }

      return res.status(200).json({
        message: 'Here are your posts!',
        postFound,
      });
    }

    return res.status(403).json({
      message: 'You cannot access this route',
      details: 'You need to be logged in to see your posts',
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
      message: `Post id: ${req.params.id}, successfully deleted`,
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

    if (likes && dislikes) {
      return res.status(409).json({
        message: 'Unable to complete the action.',
        details:
          'This action only accepts one key at the time, choose -likes- or -dislikes-',
      });
    }

    if (likes === 'true') {
      postFound.likes += 1;
      postFound.clicks += 1;

      await postFound.save();

      return res.status(200).json({
        message: 'Post successfuly evaluated!.',
        postFound,
      });
    }
    if (dislikes === 'true') {
      postFound.dislikes += 1;
      postFound.clicks += 1;

      await postFound.save();

      return res.status(200).json({
        message: 'Post successfuly evaluated!.',
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

    if (findTeacher === null && findStudent === null) {
      return res.status(403).json({
        message: 'You cannot access this route',
        details: 'You need to be logged in to post',
      });
    }

    if (findTeacher) {
      const { favorites } = findTeacher;

      const checkIfPostIsFavorite = favorites.find(
        (post) => post._id.toString() === req.params.id.toString(),
      );

      if (checkIfPostIsFavorite) {
        return res.status(406).json({
          message: 'You cannot add this post to your favorites',
          details: `You already have added the post: ${req.params.id}, to your favorites.`,
        });
      }

      findTeacher.favorites.push(postFound);
      await findTeacher.save();
      postFound.clicks += 1;
      await postFound.save();

      return res.status(200).json({
        message: 'Post successfuly added to your favorites!.',
        findTeacher,
      });
    }

    if (findStudent) {
      const { favorites } = findStudent;

      const checkIfPostIsFavorite = favorites.find(
        (post) => post._id.toString() === req.params.id.toString(),
      );

      if (!checkIfPostIsFavorite) {
        return res.status(404).json({
          message: 'You could not remove the post from your favorites.',
          details: `You already have added the post: ${req.params.id}, to your favorites.`,
        });
      }

      findStudent.favorites.push(postFound);
      await findStudent.save();
      postFound.clicks += 1;
      await postFound.save();

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
        details: 'You need to be logged in to post',
      });
    }

    if (findTeacher) {
      const { favorites } = findTeacher;

      const checkIfPostIsFavorite = favorites.findIndex(
        (post) => post._id.toString() === req.params.id.toString(),
      );

      if (!checkIfPostIsFavorite) {
        return res.status(404).json({
          message: 'You could not remove the post from your favorites.',
          details: `We could not find the post: ${req.params.id}, in your favorites.`,
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

      if (!checkIfPostIsFavorite) {
        return res.status(404).json({
          message: 'You could not remove the post from your favorites.',
          details: `We could not find the post: ${req.params.id}, in your favorites.`,
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

    postFound.comments.push(newComment);
    postFound.clicks += 1;

    await postFound.save();

    return res.status(200).json({
      message: `You commented on post id: ${req.params.id}.`,
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

    const postFound = await PostsSchema.findById(req.params.id).select(
      '-userId',
    );
    if (postFound === null) {
      return res.status(404).json({
        message: 'Fail to delete the comment',
        details: `There isn't a post with the id: ${req.params.id}, in the database.`,
      });
    }
    const { comments } = postFound;
    const checkCommentId = comments.find(
      (comment) => comment._id.toString() === req.params.commentId.toString(),
    );

    if (checkCommentId === undefined) {
      return res.status(404).json({
        message: 'Fail to delete the comment',
        details: `There isn't a comment with the id: ${req.params.commentId}, in the database.`,
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
      message: `We could not delete the comment: ${req.params.commentId} from the post id: ${req.params.id} . Please try again later`,
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

    const postFound = await PostsSchema.findById(req.params.id).select(
      '-userId',
    );
    if (postFound === null) {
      return res.status(404).json({
        message: 'Fail to update the comment',
        details: `There isn't a post with the id: ${req.params.id}, in the database.`,
      });
    }
    const { comments } = postFound;

    const checkCommentId = comments.find(
      (comment) => comment._id.toString() === req.params.commentId.toString(),
    );

    if (checkCommentId === undefined) {
      return res.status(404).json({
        message: 'Fail to delete the comment',
        details: `There isn't a comment with the id: ${req.params.commentId}, in the database.`,
      });
    }

    if (findTeacher) {
      if (findTeacher.username === checkCommentId.commentUsername) {
        const index = comments.indexOf(checkCommentId);
        comments.splice(index, 1, req.body.replyBody);

        postFound.clicks += 1;
        await postFound.save();

        return res.status(200).json({
          message: 'Comment successfully updated',
          checkCommentId,
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

    return res.status(500).json({
      message: `We could not update the comment: ${req.params.commentId} from the post id: ${req.params.id} . Please try again later`,
      details: 'Only the creator of the comment can update it.',
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
};
