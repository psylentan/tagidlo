import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  try {
    // Create a temporary file from the buffer
    const tempFilePath = './temp-audio.webm';
    fs.writeFileSync(tempFilePath, audioBuffer);

    // Create a readable stream from the file
    const audioStream = fs.createReadStream(tempFilePath);

    const response = await openai.audio.transcriptions.create({
      file: audioStream as any,
      model: 'whisper-1',
    });

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    return response.text;
  } catch (error) {
    console.error('Error in transcribeAudio:', error);
    throw error;
  }
} 