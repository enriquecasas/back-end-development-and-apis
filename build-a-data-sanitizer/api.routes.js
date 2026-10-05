import { Router } from 'express';
import { inputCleaner, inputValidator } from './middleware.js';

const router = Router();

router.get("/", (req, res) => {
  res.redirect('/form');
});

router.get("/form", (req, res, next) => {
res.sendFile(path.resolve('public/index.html'));
});

router.post('/submit', inputCleaner, inputValidator, (req, res) => {
  const { username, comment } = req.body;
  res.json({ username, comment });
});

export default router;