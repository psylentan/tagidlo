import axios, { AxiosError } from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:4000/api/transcription/transcribe';

async function testTranscription() {
  try {
    // Create a test audio file path
    const testAudioPath = path.join(__dirname, '../../test-files/test-audio.webm');
    
    // Check if file exists
    if (!fs.existsSync(testAudioPath)) {
      console.error('Test audio file not found at:', testAudioPath);
      return;
    }

    console.log('Found test audio file at:', testAudioPath);
    
    // Create form data
    const formData = new FormData();
    const fileStream = fs.createReadStream(testAudioPath);
    formData.append('audio', fileStream, {
      filename: 'test-audio.webm',
      contentType: 'audio/webm'
    });

    console.log('Sending request to:', API_URL);

    // Make the request
    const response = await axios.post(API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'Content-Type': 'multipart/form-data'
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    console.log('Transcription successful!');
    console.log('Response:', response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Transcription failed with status:', error.response?.status);
      console.error('Error response:', error.response?.data);
      console.error('Error message:', error.message);
    } else {
      console.error('Transcription failed with error:', error);
    }
  }
}

// Run the test
console.log('Starting transcription test...');
testTranscription(); 