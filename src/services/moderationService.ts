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

  async evaluateReport(reporte: string, veredicto: any): Promise<any> {
    const microserviceResponse = await fetch(process.env.MICROSERVICE_URL || 'http://localhost:4000/api/evaluar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reporte,
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
}
