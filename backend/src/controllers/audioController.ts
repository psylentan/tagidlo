import { Request, Response } from 'express';
import { AudioFile, ApiResponse } from '../types';

export const uploadAudio = async (req: Request, res: Response) => {
  try {
    console.log('Received upload request');
    console.log('Request file:', req.file);
    console.log('Request body:', req.body);

    if (!req.file) {
      console.log('No file received');
      return res.status(400).json({
        success: false,
        error: 'No audio file provided'
      } as ApiResponse<null>);
    }

    const audioFile: AudioFile = {
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size
    };

    console.log('File processed successfully:', audioFile);

    return res.status(200).json({
      success: true,
      data: audioFile
    } as ApiResponse<AudioFile>);
  } catch (error) {
    console.error('Error in uploadAudio:', error);
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse<null>);
    }
    return res.status(500).json({
      success: false,
      error: 'Error uploading audio file'
    } as ApiResponse<null>);
  }
}; 