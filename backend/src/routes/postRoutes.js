import express from 'express';
import Post from '../models/Post.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private (Needs Token)
router.post('/', protect, async (req, res) => {
  try {
    const newPost = new Post({
      content: req.body.content,
      image: req.body.image,
      user: req.user // Taken from the protect middleware
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;