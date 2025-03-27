Sure! Here's a concise summary that you can use to describe the full project to **Cursor.AI**. It includes the **description**, **screens**, **tech stack**, **actions**, and **user flow** for the app.

---

### **Project Overview for Cursor.AI**

#### **Description**:
The **Quick Voice Recorder & Task Manager** is a web-based application that allows users to record voice notes, transcribe them into text, and create tasks directly in **ClickUp**. The tool leverages **OpenAI Whisper** for transcription and integrates seamlessly with **ClickUp's API** to create tasks, assign them to teams, and attach audio recordings as references. The app simplifies task creation by allowing users to filter spaces, lists, and assignees via live text filters and automatically populates the task details using transcription data.

---

### **Screens in the App**:

1. **Main Screen (Recording)**:
   - **Record Button**: Initiates voice recording.
   - **Analyze Button**: Sends the recording to OpenAI Whisper for transcription.
   - The user clicks to stop recording and sends the audio for analysis.

2. **Task Creation Screen**:
   - Displays the transcription after analysis.
   - Fields auto-filled with transcription details: **task name**, **folder**, **assignee**, **task details**.
   - **Live filters** to select spaces, lists, and assignees.
   - **Edit Options**: The user can edit the task name, folder, assignee, and task details before submission.
   - **Submit Button**: Sends the final task to ClickUp via the ClickUp API.

3. **Login / Authentication Screen**:
   - Users authenticate with **ClickUp** via OAuth 2.0 to obtain an API token.

4. **Settings Screen** (Optional):
   - Manage ClickUp integration settings (disconnect or re-authenticate).

---

### **Tech Stack**:

- **Frontend**: 
  - **React.js** for building the UI components.
  - **Axios** for handling API requests to OpenAI and ClickUp.
  - **CSS** or **Styled Components** for styling.
  - **Service Worker** for PWA functionality (offline support).

- **Backend**:
  - **Node.js** with **Express.js** for handling backend requests.
  - **OpenAI API** for transcribing audio (Whisper model).
  - **ClickUp API** for task creation and interaction with ClickUp (spaces, lists, assignees).

- **Authentication**:
  - **OAuth 2.0** for secure ClickUp authentication and token storage.

- **Database** (optional):
  - **MongoDB** or **LocalStorage** (for caching lists of spaces, lists, and assignees).

---

### **Actions in the App**:

1. **Start Recording**: User clicks the **Record** button to start voice recording.
2. **Stop Recording**: User clicks **Stop** to end the recording.
3. **Analyze Recording**: The recording is sent to **OpenAI Whisper** for transcription.
4. **Fetch Spaces**: Retrieve available **spaces** from the **ClickUp API**.
5. **Fetch Lists**: Retrieve lists from a selected space in ClickUp.
6. **Fetch Assignees**: Retrieve assignees from **ClickUp** based on team or task context.
7. **Live Text Filtering**: Users can type and filter through **spaces**, **lists**, and **assignees** in real-time from the static list.
8. **Populate Task Fields**: After transcription, fields like **task name**, **folder**, **assignee**, and **task details** are populated.
9. **Edit Task Details**: User can manually edit the pre-filled task details before submission.
10. **Submit Task**: Send the completed task with transcription and attachment (audio URL) to **ClickUp** via the **ClickUp API**.

---

### **User Flow**:

1. **User Opens the App**:
   - The user is presented with the **Main Screen** with the **Record** button.
   
2. **User Clicks "Record"**:
   - The user begins recording their voice note.
   
3. **User Clicks "Stop"**:
   - The recording is completed and stored temporarily on the server.
   - The user then clicks the **Analyze** button.

4. **Transcription Process**:
   - The voice recording is sent to the **OpenAI Whisper API** for transcription.
   - Upon completion, the transcription text is returned.

5. **Task Creation**:
   - The app uses **ClickUp API** to fetch **spaces**, **lists**, and **assignees** (if not already available).
   - The transcription text is processed into structured data (task name, details, assignee, folder, etc.) via a custom prompt.
   - The task creation form is pre-filled with the transcription data and the user can edit these fields if needed.

6. **Attach Audio**:
   - The audio file is uploaded to your server and a **URL** is attached to the task in **ClickUp**.

7. **Submit Task to ClickUp**:
   - The final task is submitted to **ClickUp**, with all the details (including transcription and attached audio file URL).

8. **User Confirms**:
   - The user confirms the task is created and opened in **ClickUp**.

---

### **Conclusion**:

This project involves building a web app that simplifies task creation in **ClickUp** by using voice input. The app will record, transcribe, and auto-populate task details, making it easier for users to manage tasks. The integration with **ClickUp API** allows seamless task creation, while **OpenAI Whisper API** handles transcription.

The tech stack focuses on simplicity and scalability, utilizing **React.js** for the frontend, **Node.js/Express** for the backend, and **ClickUp** and **OpenAI APIs** for integration and transcription.

---

This concise overview, along with the details of the screens, actions, and user flow, should give **Cursor.AI** a good foundation to start building the app step by step. Let me know if you need further refinements or additional details!