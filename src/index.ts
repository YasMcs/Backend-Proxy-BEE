import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.get('/api/salud', (req, res) => {
  res.json({ estado: 'activo' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
