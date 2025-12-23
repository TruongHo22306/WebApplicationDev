import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  avatar: { type: String, default: "https://i.pravatar.cc/150?img=35" }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);