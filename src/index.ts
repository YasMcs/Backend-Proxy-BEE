import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

app.use(express.json());

app.get('/api/salud', (req, res) => {
  res.json({ estado: 'activo' });
});

app.post('/api/moderar', (req, res) => {
  const { reporte } = req.body;
  if (!reporte || typeof reporte !== 'string') {
    res.status(400).json({ error: 'El campo reporte es obligatorio y debe ser texto.' });
    return;
  }
  res.json({ mensaje: 'Reporte recibido para moderación', reporte });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
