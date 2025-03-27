import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const API_URL = 'http://localhost:4000/api/transcription/transcribe';
const RECORD_DURATION = 5; // Duration in seconds
const OUTPUT_FILE = path.join(__dirname, '../../test-files/recorded-audio.webm');

async function recordAudio(): Promise<string> {
  return new Promise((resolve, reject) => {
    // Using FFmpeg to record audio
    const ffmpeg = spawn('ffmpeg', [
      '-f', 'dshow',  // DirectShow input
      '-i', 'audio=Microphone Array (Realtek(R) Audio)', // Use default microphone
      '-t', RECORD_DURATION.toString(),  // Duration
      '-acodec', 'libopus',  // Use Opus codec (compatible with WebM)
      '-f', 'webm',  // WebM container
      OUTPUT_FILE
    ]);

    console.log('Recording started... Speak now!');
    console.log(`Recording for ${RECORD_DURATION} seconds...`);

    ffmpeg.stderr.on('data', (data) => {
      console.log(`FFmpeg: ${data}`);
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        console.log('Recording completed successfully!');
        resolve(OUTPUT_FILE);
      } else {
        reject(new Error(`FFmpeg process exited with code ${code}`));
      }
    });

    ffmpeg.on('error', (err) => {
      reject(err);
    });
  });
}

async function transcribeAudio(audioPath: string) {
  try {
    // First, check if the server is running
    try {
      await axios.get('http://localhost:4000/health');
      console.log('Server is running and healthy');
    } catch (error) {
      console.error('Server is not running or not responding. Please start the server first.');
      return;
    }

    // Check if file exists
    if (!fs.existsSync(audioPath)) {
      console.error('Audio file not found at:', audioPath);
      return;
    }

    console.log('Found audio file at:', audioPath);
    
    // Create form data
    const formData = new FormData();
    const fileStream = fs.createReadStream(audioPath);
    formData.append('audio', fileStream, {
      filename: 'recorded-audio.webm',
      contentType: 'audio/webm'
    });

    console.log('Sending request to:', API_URL);

    // Make the request
    const response = await axios.post(API_URL, formData, {
      headers: {
        ...formData.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 30000 // 30 seconds timeout
    });

    console.log('Transcription successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));

    // Clean up the recorded file
    fs.unlinkSync(audioPath);
    console.log('Cleaned up recorded audio file');
  } catch (error: any) {
    if (error.response) {
      console.error('Transcription failed with status:', error.response.status);
      console.error('Error response:', error.response.data);
    }
    console.error('Error message:', error.message);
  }
}

// Run the recording and transcription
console.log('Starting audio recording and transcription test...');
recordAudio()
  .then(audioPath => transcribeAudio(audioPath))
  .catch(error => console.error('Error:', error)); 