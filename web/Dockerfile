FROM node:23-slim
WORKDIR /app
COPY . .
RUN npm install express mysql2
EXPOSE 4000
CMD ["node", "server.js"]