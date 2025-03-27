import OpenAI from 'openai';
import fs from 'fs';
import { TranscriptionResult } from '../types';

class OpenAIService {
  private client: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required but not set in environment variables');
    }
    
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async transcribeAudio(audioPath: string): Promise<TranscriptionResult> {
    try {
      console.log('Starting transcription for:', audioPath);
      
      // Check if file exists
      if (!fs.existsSync(audioPath)) {
        throw new Error(`Audio file not found at path: ${audioPath}`);
      }

      // Create a file stream
      const file = fs.createReadStream(audioPath);
      
      const transcription = await this.client.audio.transcriptions.create({
        file,
        model: "whisper-1",
        language: "en",
        response_format: "json"
      });

      console.log('Transcription completed successfully:', transcription);

      return {
        text: transcription.text,
        confidence: 0.95, // Whisper API doesn't provide confidence scores
        language: 'en'
      };
    } catch (error) {
      console.error('Error in transcribeAudio:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to transcribe audio: ${error.message}`);
      }
      throw new Error('Failed to transcribe audio file');
    }
  }
}

export default new OpenAIService(); 