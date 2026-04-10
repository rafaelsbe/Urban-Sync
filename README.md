# ConstruPrime - Engenharia & Real Estate

Este é um projeto desenvolvido com **Next.js 15**, **Tailwind CSS**, **ShadCN UI** e **Genkit AI**. Siga as instruções abaixo para rodar o projeto em sua máquina local.

## 🚀 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (Versão 20 ou superior recomendada)
- npm (já vem com o Node.js)

## 🛠️ Configuração Inicial

1. **Instalar Dependências:**
   No terminal, dentro da pasta do projeto, execute:
   ```bash
   npm install
   ```

2. **Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto (se ainda não existir) e adicione sua chave de API do Google Gemini para que o Assistente de IA funcione:
   ```env
   GOOGLE_GENAI_API_KEY=sua_chave_aqui
   ```
   *Você pode obter uma chave gratuita no [Google AI Studio](https://aistudio.google.com/).*

## 💻 Executando o Projeto

### Modo de Desenvolvimento
Para rodar o servidor de desenvolvimento com hot-reload:
```bash
npm run dev
```
O site estará disponível em: [http://localhost:9002](http://localhost:9002)

### Interface do Genkit (Opcional)
Para testar e depurar os fluxos de IA (Prompts) de forma isolada:
```bash
npm run genkit:dev
```

## 🏗️ Build para Produção

Se desejar gerar a versão otimizada para produção:

1. **Gerar o build:**
   ```bash
   npm run build
   ```

2. **Iniciar o servidor de produção:**
   ```bash
   npm run start
   ```

## 📂 Estrutura Principal
- `src/app`: Rotas e layout do Next.js.
- `src/components`: Componentes React e UI (ShadCN).
- `src/ai`: Lógica de Inteligência Artificial e Prompts (Genkit).
- `src/lib`: Dados estáticos e utilitários.

---
Desenvolvido com foco em alta performance e experiência do usuário.
