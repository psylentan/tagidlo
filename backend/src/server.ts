import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import transcriptionRoutes from './routes/transcriptionRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' });
});

// API routes
app.use('/api/transcription', transcriptionRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 