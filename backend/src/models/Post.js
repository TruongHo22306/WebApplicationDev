import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links the post to a specific user
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String // URL for an uploaded image
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);