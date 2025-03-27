import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import audioRoutes from './routes/audioRoutes';
import transcriptionRoutes from './routes/transcriptionRoutes';
import { ensureDirectoryExists } from './utils/fileSystem';

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is required but not set in environment variables');
  process.exit(1);
}

// Create Express app
const app = express();
const port = process.env.PORT || 4000;

// Ensure required directories exist
const uploadsDir = path.join(__dirname, '../uploads');
const testFilesDir = path.join(__dirname, '../test-files');
ensureDirectoryExists(uploadsDir);
ensureDirectoryExists(testFilesDir);

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(uploadsDir));
app.use('/test-files', express.static(testFilesDir));

// Routes
app.use('/api/audio', audioRoutes);
app.use('/api/transcription', transcriptionRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 