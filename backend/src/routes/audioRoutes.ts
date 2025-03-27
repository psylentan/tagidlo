import { Router } from 'express';
import { uploadAudio } from '../controllers/audioController';
import upload from '../config/multer';

const router = Router();

// Upload audio file
router.post('/upload', upload.single('audio'), uploadAudio);

export default router; 