import { Router } from 'express';
import { ModerationController } from '../controllers/moderationController.ts';

const router = Router();
const moderationController = new ModerationController();

router.post('/moderar', (req, res) => {
  moderationController.moderar(req, res);
});

export default router;
