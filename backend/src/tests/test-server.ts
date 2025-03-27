import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Serve static files from the tests directory
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
    console.log(`Test server running at http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT}/record-test.html in your browser`);
}); 