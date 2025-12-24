import express from 'express';
import Reel from '../models/Reel.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST api/reels
// @desc    Upload a reel
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const newReel = new Reel({
      video: req.body.video,
      caption: req.body.caption,
      user: req.user
    });

    const reel = await newReel.save();
    res.json(reel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/reels
// @desc    Get all reels
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const reels = await Reel.find()
      .populate('user', 'first last avatar')
      .sort({ createdAt: -1 });
    res.json(reels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;