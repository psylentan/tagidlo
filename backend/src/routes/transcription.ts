import express, { Request, Response } from 'express';
import multer from 'multer';
import { transcribeAudio } from '../services/transcription';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/transcribe', upload.single('audio'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const transcription = await transcribeAudio(req.file.buffer);
    res.json({ transcription });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
});

export default router; 