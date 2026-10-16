# Estágio 1: Build do frontend com Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os manifestos de dependências
COPY package*.json ./

# Instala todas as dependências necessárias para o build
RUN npm install

# Copia o código fonte do projeto
COPY . .

# Compila o frontend para produção (gera pasta dist/)
RUN npm run build

# Estágio 2: Execução em produção
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copia dependências instaladas e arquivos essenciais
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Porta do container
EXPOSE 3000

# Inicia o servidor Express em modo produção
CMD ["npx", "tsx", "server.ts"]
