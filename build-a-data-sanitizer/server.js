import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { inputCleaner, inputValidator } from './middleware.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/form');
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post(
    '/submit',
    inputCleaner,
    inputValidator,
    (req, res) => {
        res.send(`
      <h1>Sanitized Data</h1>
      <p>Username: ${req.body.username}</p>
      <p>Comment: ${req.body.comment}</p>
    `);
    }
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});