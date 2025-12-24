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

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Fetch posts and link them to user data (first, last, avatar)
    const posts = await Post.find()
      .populate('user', 'first last avatar') 
      .sort({ createdAt: -1 }); // Newest posts first
    
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // 1. Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // 2. Check user: Ensure the logged-in user matches the post author
    // post.user is an object (ID), req.user is a string (ID from token)
    if (post.user.toString() !== req.user) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // 3. Delete the post
    await post.deleteOne();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

export default router;