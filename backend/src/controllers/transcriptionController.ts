import { Request, Response } from 'express';
import { ApiResponse, TranscriptionResult } from '../types';
import openaiService from '../services/openaiService';
import fs from 'fs';

export const transcribeAudio = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No audio file provided'
      } as ApiResponse<null>);
    }

    const audioPath = req.file.path;
    console.log('Processing audio file:', audioPath);

    // Transcribe the audio
    const transcription = await openaiService.transcribeAudio(audioPath);

    // Clean up the uploaded file after transcription
    fs.unlink(audioPath, (err) => {
      if (err) {
        console.error('Error deleting audio file:', err);
      } else {
        console.log('Successfully deleted audio file:', audioPath);
      }
    });

    return res.status(200).json({
      success: true,
      data: transcription
    } as ApiResponse<TranscriptionResult>);
  } catch (error) {
    console.error('Error in transcribeAudio controller:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to transcribe audio'
    } as ApiResponse<null>);
  }
}; 