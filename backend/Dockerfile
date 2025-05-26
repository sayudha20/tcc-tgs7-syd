FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/_health || exit 1

CMD ["npm", "start"]
