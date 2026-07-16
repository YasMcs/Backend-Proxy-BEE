import { Router } from 'express';
import { ModerationController } from '../controllers/moderationController.js';

const router = Router();
const moderationController = new ModerationController();

router.post('/moderar', (req, res) => {
  moderationController.moderar(req, res);
});

router.get('/reportes', (req, res) => {
  moderationController.obtenerAprobados(req, res);
});

router.post('/reportes/:id/like', (req, res) => {
  moderationController.darLike(req, res);
});

export default router;
