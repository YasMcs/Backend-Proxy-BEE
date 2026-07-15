import type { Request, Response } from 'express';
import { ModerationService } from '../services/moderationService.ts';

const moderationService = new ModerationService();

export class ModerationController {
  async moderar(req: Request, res: Response): Promise<void> {
    const { reporte } = req.body;

    if (!reporte || typeof reporte !== 'string') {
      res.status(400).json({ error: 'El campo reporte es obligatorio y debe ser texto.' });
      return;
    }

    try {
      const veredicto = await moderationService.moderateText(reporte);
      const result = await moderationService.evaluateReport(reporte, veredicto);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Error interno en el servidor de moderación.' });
    }
  }
}
