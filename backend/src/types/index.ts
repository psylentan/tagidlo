// Audio Types
export interface AudioFile {
  filename: string;
  path: string;
  mimetype: string;
  size: number;
}

// Transcription Types
export interface TranscriptionResult {
  text: string;
  confidence: number;
  language?: string;
}

// ClickUp Types
export interface ClickUpSpace {
  id: string;
  name: string;
  private: boolean;
}

export interface ClickUpList {
  id: string;
  name: string;
  space: ClickUpSpace;
}

export interface ClickUpUser {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
}

export interface ClickUpTask {
  name: string;
  description: string;
  assignees: string[];
  status: string;
  priority: number;
  due_date?: number;
  list_id: string;
  attachments?: string[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 