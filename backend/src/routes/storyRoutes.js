import express from 'express';
import Story from '../models/Story.js';
import User from '../models/User.js'; // Ensure User is registered
import { protect } from '../middleware/auth.js'; // Double check your auth import path
import { cloudinary, upload } from '../config/cloudinary.js';

const router = express.Router();

// @route   POST api/stories
// @desc    Create a new story (Supports Image File or Gradient)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    // 1. Parse JSON strings from FormData
    // When using FormData, objects/arrays must be sent as stringified JSON
    const mediaData = req.body.media ? JSON.parse(req.body.media) : {};
    const objects = req.body.objects ? JSON.parse(req.body.objects) : [];
    const strokes = req.body.strokes ? JSON.parse(req.body.strokes) : [];

    let finalSrc = mediaData.src; // Default to gradient string or existing URL

    // 2. Upload Image to Cloudinary (if a file was sent)
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'mellow_stories' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      finalSrc = result.secure_url; // Use the Cloudinary URL
    }

    // 3. Create Story in Database
    const newStory = new Story({
      user: req.user,
      media: {
        type: mediaData.type || 'image',
        src: finalSrc, // This is now a short URL (or gradient CSS), not Base64!
        name: mediaData.name
      },
      objects,
      strokes
    });

    const savedStory = await newStory.save();
    res.json(savedStory);
  } catch (err) {
    console.error("Story Upload Error:", err);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/stories
// @desc    Get all active stories
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