import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import moderationRouter from './routes/moderationRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

app.use(express.json());

app.get('/api/salud', (req, res) => {
  res.json({ estado: 'activo' });
});

app.use('/api', moderationRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
