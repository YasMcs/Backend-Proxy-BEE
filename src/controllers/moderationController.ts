import type { Request, Response } from 'express';
import { ModerationService } from '../services/moderationService.js';

const moderationService = new ModerationService();

export class ModerationController {
  async moderar(req: Request, res: Response): Promise<void> {
    const { reporte, tipo } = req.body;

    if (!reporte || typeof reporte !== 'string') {
      res.status(400).json({ error: 'El campo reporte es obligatorio y debe ser texto.' });
      return;
    }

    const tipoValido = tipo === 'sugerencia' ? 'sugerencia' : 'reporte';

    try {
      const veredicto = await moderationService.moderateText(reporte);
      const result = await moderationService.evaluateReport(reporte, veredicto, tipoValido);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Error interno en el servidor de moderación.' });
    }
  }

  async obtenerAprobados(req: Request, res: Response): Promise<void> {
    try {
      const result = await moderationService.getApprovedReports();
      res.json(result);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Error al obtener las sugerencias.' });
    }
  }

  async darLike(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await moderationService.likeReport(id as string);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Error al dar like a la sugerencia.' });
    }
  }
}
