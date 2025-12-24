import express from 'express';
import Post from '../models/Post.js';
import { protect } from '../middleware/auth.js'; // Check if your file is named auth.js or authMiddleware.js
import { cloudinary, upload } from '../config/cloudinary.js';

const router = express.Router();

// @route   POST api/posts
// @desc    Create a post with Cloudinary Image Upload
// @access  Private
// FIX 1: Add 'upload.single' middleware to process the file
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';

    // FIX 2: Upload to Cloudinary if a file exists
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'mellow_app_posts' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    } 
    // Fallback: If no file, check if user sent a base64 string (optional, for backward compatibility)
    else if (req.body.image) {
      imageUrl = req.body.image;
    }

    const newPost = new Post({
      content: req.body.content,
      image: imageUrl, // Use the Cloudinary URL
      user: req.user,
      location: req.body.location || ''
    });

    const post = await newPost.save();
    
    // Populate user details immediately so the frontend can display the avatar
    await post.populate('user', 'first last avatar');

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// ... keep your GET and DELETE routes exactly as they are ...

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