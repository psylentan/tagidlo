# SayIT - Quick Voice Recorder & Task Manager

A web-based application that allows users to record voice notes, transcribe them into text, and create tasks directly in ClickUp. The tool leverages OpenAI Whisper for transcription and integrates seamlessly with ClickUp's API.

## Features

- 🎙️ Voice Recording with 5-minute limit
- 🔄 OpenAI Whisper Transcription
- 📝 Automatic Task Creation in ClickUp
- 👥 ClickUp Integration (Spaces, Lists, Assignees)
- 🎨 Clean, Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React.js with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Headless UI for accessible components
- Axios for API requests

### Backend
- Node.js with Express
- TypeScript for type safety
- OpenAI Whisper API for transcription
- ClickUp API for task management
- Multer for file uploads

## Project Structure

```
sayit/
├── frontend/                 # React frontend application
│   ├── src/                 # Source files
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── backend/                 # Express backend application
│   ├── src/                # Source files
│   ├── uploads/            # Audio file storage
│   └── package.json        # Backend dependencies
└── package.json            # Root package.json (workspaces)
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key
- ClickUp API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sayit.git
cd sayit
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
# In backend directory
cp .env.example .env
# Edit .env with your API keys and configuration
```

4. Start the development servers:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

## API Endpoints

### Backend API
- `POST /api/upload` - Upload audio file
- `POST /api/transcribe` - Transcribe audio with Whisper
- `GET /api/clickup/spaces` - Get ClickUp spaces
- `GET /api/clickup/lists` - Get lists from space
- `GET /api/clickup/assignees` - Get team members
- `POST /api/tasks` - Create task in ClickUp

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for the Whisper API
- ClickUp for their API
- The React and Tailwind CSS communities