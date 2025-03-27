import OpenAI from 'openai';
import fs from 'fs';
import { TranscriptionResult } from '../types';

class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async transcribeAudio(audioPath: string): Promise<TranscriptionResult> {
    try {
      console.log('Starting transcription for:', audioPath);
      
      const transcription = await this.client.audio.transcriptions.create({
        file: fs.createReadStream(audioPath),
        model: "whisper-1",
        language: "en",
        response_format: "verbose_json"
      });

      console.log('Transcription completed successfully');

      return {
        text: transcription.text,
        confidence: 0.95, // Whisper API doesn't provide confidence scores
        language: transcription.language
      };
    } catch (error) {
      console.error('Error in transcribeAudio:', error);
      throw new Error('Failed to transcribe audio file');
    }
  }
}

export default new OpenAIService(); 