'use server';
/**
 * @fileOverview An AI conversational assistant that answers FAQs related to civil engineering, real estate, and company services.
 *
 * - faqAIConversationalAssistant - A function that handles the AI conversational assistant process.
 * - FAQAIConversationalAssistantInput - The input type for the faqAIConversationalAssistant function.
 * - FAQAIConversationalAssistantOutput - The return type for the faqAIConversationalAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FAQAIConversationalAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s text query or question.'),
});
export type FAQAIConversationalAssistantInput = z.infer<typeof FAQAIConversationalAssistantInputSchema>;

const FAQAIConversationalAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI\'s concise and helpful answer to the user\'s query.'),
});
export type FAQAIConversationalAssistantOutput = z.infer<typeof FAQAIConversationalAssistantOutputSchema>;

export async function faqAIConversationalAssistant(
  input: FAQAIConversationalAssistantInput
): Promise<FAQAIConversationalAssistantOutput> {
  return faqAIConversationalAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'faqAIConversationalAssistantPrompt',
  input: {schema: FAQAIConversationalAssistantInputSchema},
  output: {schema: FAQAIConversationalAssistantOutputSchema},
  prompt: `Você é um assistente de IA especialista em engenharia civil e processos imobiliários, representando a empresa ConstruPrime. Sua tarefa é responder a perguntas comuns sobre termos da engenharia civil, processos imobiliários ou fornecer informações resumidas sobre os serviços da empresa ConstruPrime. Responda de forma concisa, útil e profissional.

Pergunta do usuário: {{{query}}}`,
});

const faqAIConversationalAssistantFlow = ai.defineFlow(
  {
    name: 'faqAIConversationalAssistantFlow',
    inputSchema: FAQAIConversationalAssistantInputSchema,
    outputSchema: FAQAIConversationalAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
