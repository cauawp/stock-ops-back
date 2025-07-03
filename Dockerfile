# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Gera client do Prisma
RUN npx prisma generate

# Compila a aplicação NestJS para JavaScript
RUN npm run build

# Etapa 2: Imagem para produção
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário da etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Executa migrations e inicia o app
CMD npx prisma migrate deploy && npm run start:prod
