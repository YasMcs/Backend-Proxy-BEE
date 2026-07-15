export class ModerationService {
  async moderateText(reporte: string): Promise<any> {
    const moderationResponse = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({ input: reporte })
    });

    if (!moderationResponse.ok) {
      throw new Error('Error al comunicarse con el servicio de moderación.');
    }

    const data: any = await moderationResponse.json();
    return data.results[0];
  }

  async evaluateReport(reporte: string, veredicto: any, tipo: string): Promise<any> {
    const microserviceResponse = await fetch(process.env.MICROSERVICE_URL || 'http://localhost:4000/api/evaluar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reporte,
        tipo,
        veredicto: {
          flagged: veredicto.flagged,
          categories: veredicto.categories
        }
      })
    });

    if (!microserviceResponse.ok) {
      throw new Error('Error en el microservicio de evaluación.');
    }

    return await microserviceResponse.json();
  }

  async getApprovedReports(): Promise<any> {
    const microserviceBase = (process.env.MICROSERVICE_URL || 'http://localhost:4000/api/evaluar').replace('/api/evaluar', '');
    const response = await fetch(`${microserviceBase}/api/reportes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al consultar las sugerencias aprobadas.');
    }

    return await response.json();
  }

  async likeReport(id: string): Promise<any> {
    const microserviceBase = (process.env.MICROSERVICE_URL || 'http://localhost:4000/api/evaluar').replace('/api/evaluar', '');
    const response = await fetch(`${microserviceBase}/api/reportes/${id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al dar like a la sugerencia.');
    }

    return await response.json();
  }
}
