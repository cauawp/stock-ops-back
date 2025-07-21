# Etapa 1: build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Etapa 2: imagem final de produção
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

EXPOSE 3001

# Copia o start.sh e dá permissão de execução
COPY start.sh .
RUN chmod +x start.sh

# Executa o script start.sh que roda migrations e inicia app
CMD ["./start.sh"]
