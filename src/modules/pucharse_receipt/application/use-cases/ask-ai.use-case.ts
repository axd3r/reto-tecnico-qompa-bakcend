import { Injectable, Inject } from '@nestjs/common';
import { PurchaseReceiptRepository } from '../../domain/repositories/purchase-receipt.repository';
import { OpenAI } from 'openai';

@Injectable()
export class AskAIUseCase {
    private openai: OpenAI;

    constructor(
        @Inject('PurchaseReceiptRepository')
        private readonly repository: PurchaseReceiptRepository,
    ) {
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

    async execute(question: string): Promise<{ answer: string }> {
        const { data } = await this.repository.findAll({
            page: 1,
            limit: 100,
        });

        if (data.length === 0) {
            return { answer: 'No se encontraron comprobantes para analizar.' };
        }

        const context = data.map((r) => ({
            invoiceNumber: r.invoiceNumber,
            amount: r.amount,
            issueDate: r.issueDate.toISOString().split('T')[0],
            documentType: r.documentType,
            status: r.status,
        }));

        const prompt = `
        Eres un asistente financiero que ayuda a analizar comprobantes de compra.
        Responde con base en los siguientes datos JSON:

        ${JSON.stringify(context, null, 2)}

        Pregunta del usuario: "${question}"
        `;

        const response = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2,
        });

        return { answer: response.choices[0].message.content ?? 'No se pudo generar una respuesta.' };
    }
}
