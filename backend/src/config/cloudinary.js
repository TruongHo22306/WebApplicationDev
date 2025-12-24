import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// 1. Configure Cloudinary (Use the keys from your code snippet)
cloudinary.config({
  cloud_name: 'dmwkormks', 
  api_key: '737744482677658', 
  api_secret: 'Gc33Utba1CU3PsWcEHYnSqbvIU8' // <--- COPY THIS FROM YOUR DASHBOARD!
});

// 2. Configure Multer 
// We use memoryStorage so we can pass the file buffer directly to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fieldSize: 10 * 1024 * 1024 // 10MB (Default is 1MB)
  }
});

export { cloudinary, upload };