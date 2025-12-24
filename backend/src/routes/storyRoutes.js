import express from 'express';
import Story from '../models/Story.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST api/stories
// @desc    Create a new story with all layers
router.post('/', protect, async (req, res) => {
  try {
    const { media, objects, strokes } = req.body;

    const newStory = new Story({
      user: req.user,
      media: {
        type: media.type,
        src: media.src || media.gradient, // Handle both image src and gradient value
        name: media.name
      },
      objects,
      strokes
    });

    const savedStory = await newStory.save();
    res.json(savedStory);
  } catch (err) {
    console.error("Story Upload Error:", err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/stories
// @desc    Get all active stories (populated)
router.get('/', protect, async (req, res) => {
  try {
    const stories = await Story.find()
      .populate('user', 'first last avatar')
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;