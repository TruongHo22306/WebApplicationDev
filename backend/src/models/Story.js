import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Background (Image Base64 or Gradient String)
  media: {
    type: { 
      type: String, 
      enum: ['image', 'gradient'], 
      default: 'image' 
    },
    src: { type: String, required: true }, // Stores Base64 or Gradient CSS
    name: { type: String }
  },
  // Interactive Objects (Text & Stickers)
  objects: [
    {
      id: String,
      type: { type: String }, // 'text' or 'sticker'
      // Text specific
      text: String,
      color: String,
      fontSize: Number,
      weight: Number,
      align: String,
      // Sticker specific
      emoji: String,
      // Common transformations
      x: Number,
      y: Number,
      scale: Number,
      rotation: Number
    }
  ],
  // Drawing Strokes
  strokes: [
    {
      color: String,
      size: Number,
      points: [
        { x: Number, y: Number }
      ]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // Auto-delete after 24 hours
  }
});

export default mongoose.model('Story', StorySchema);