import { Router } from 'express';
import { transcribeAudio } from '../controllers/transcriptionController';
import upload from '../config/multer';

const router = Router();

// Transcribe audio file
router.post('/transcribe', upload.single('audio'), transcribeAudio);

export default router; 