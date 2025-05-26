FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080  # Tambahkan ini
EXPOSE 8080    # Ubah dari 5000 ke 8080

CMD ["npm", "start"]
