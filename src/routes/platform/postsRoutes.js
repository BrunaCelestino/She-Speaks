const express = require('express');

const router = express.Router();

const controller = require('../../controllers/platform/postsController');

const { checkAuth, checkAuthAndPermissionPosts } = require('../../middlewares/auth');

router.post('/feed/post/new', checkAuth, controller.createPosts);
router.get('/feed/post/my-posts', checkAuth, controller.findMyPosts);
router.put('/feed/post/update/:id', checkAuthAndPermissionPosts, controller.updatePost);
router.delete('/feed/post/delete/:id', checkAuthAndPermissionPosts, controller.deletePosts);
router.patch('/feed/post/new-comment/:id', checkAuth, controller.commentPosts);
router.delete('/feed/post/commented-post/:id/remove-comment/:commentId', checkAuth, controller.deleteCommentFromPosts);
router.patch('/feed/post/commented-post/:id/update-comment/:commentId', checkAuth, controller.updateCommentFromPosts);
router.patch('/feed/post/add-to-favorite/:id', checkAuth, controller.saveFavoritePosts);
router.delete('/feed/post/remove-from-favorite/:id', checkAuth, controller.removeFavoritePosts);
router.put('/feed/post/likes-dislikes/:id', checkAuthAndPermissionPosts, controller.likeOrDislikePosts);
router.get('/feed/post/:id', checkAuth, controller.getPostsById);
router.get('/feed', checkAuth, controller.getAllPosts);

module.exports = router;
