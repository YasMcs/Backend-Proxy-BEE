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

app.post('/api/moderar', async (req, res) => {
  const { reporte } = req.body;
  if (!reporte || typeof reporte !== 'string') {
    res.status(400).json({ error: 'El campo reporte es obligatorio y debe ser texto.' });
    return;
  }

  try {
    const moderationResponse = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({ input: reporte })
    });

    if (!moderationResponse.ok) {
      res.status(500).json({ error: 'Error al comunicarse con el servicio de moderación.' });
      return;
    }

    const data: any = await moderationResponse.json();
    const veredicto = data.results[0];

    res.json({
      reporte,
      veredicto: {
        flagged: veredicto.flagged,
        categories: veredicto.categories
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno en el servidor de moderación.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
